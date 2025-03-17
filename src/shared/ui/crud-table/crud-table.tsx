import { useTableData } from '@/entities/user-table';
import { UniversalEditModal } from '@/shared/ui';
import { TableSort } from '@/shared/ui/table/table';
import { ActionIcon, Button, Drawer, Group, Pagination, TextInput } from '@mantine/core';
import { IconFilter, IconPlus, IconSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { FilterPanel } from './filter-panel';
import { Filter } from './types';

interface CrudTableProps<T, N> {
  tableName: string;
  columns: any[];
  formColumns: Record<string, any>;
  idField: string;
  normalizeData?: (data: T[], relations?: any) => N[];
  relations?: {
    [key: string]: string;
  };
  showAddButton?: boolean;
  // Опциональный кастомный компонент модального окна
  CustomEditModal?: React.ComponentType<any>;
  itemsPerPage?: number;
  formRelations?: {
    [key: string]: {
      tableName: string;
      valueField: string;
      labelField: string;
    };
  };
  isSearchable?: boolean;
  searchableColumns?: string[]; // Колонки, по которым будет осуществляться поиск
  filters?: Filter[]; // Добавляем пропс для фильтров
}

export const CrudTable = <T extends { [key: string]: any }, N = T>({
  tableName,
  columns,
  formColumns,
  idField,
  normalizeData,
  relations = {},
  showAddButton = true,
  CustomEditModal,
  itemsPerPage = 17,
  formRelations = {},
  searchableColumns = [], // По умолчанию пустой массив
  filters = [],
}: CrudTableProps<T, N>) => {
  const [selected, setSelected] = useState<T | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, refetch } = useTableData<T>(tableName);
  const relationsData = Object.entries(relations).reduce((acc, [table]) => {
    const { data: relationData } = useTableData(table);
    return { ...acc, [table]: relationData };
  }, {});

  const normalizedData = normalizeData ? normalizeData(data || [], relationsData) : data || [];

  // Применяем фильтры к данным
  const filteredData = useMemo(() => {
    let result = normalizedData;

    // Применяем поиск
    if (searchQuery) {
      // @ts-ignore
      result = result.filter((item) => {
        return searchableColumns.some((column) => {
          const value = String(item[column as keyof typeof item] || '').toLowerCase();
          return value.includes(searchQuery.toLowerCase());
        });
      });
    }

    // Применяем фильтры
    filters.forEach((filter) => {
      switch (filter.type) {
        case 'select':
          if (filterValues[filter.field]) {
            // @ts-ignore
            result = result.filter((item) => item[filter.field] === filterValues[filter.field]);
          }
          break;
        case 'date-range':
          const fromDate = filterValues[`${filter.field}_from`];
          const toDate = filterValues[`${filter.field}_to`];
          if (fromDate || toDate) {
            // @ts-ignore
            result = result.filter((item) => {
              // @ts-ignore
              const itemDate = new Date(item[filter.field]);
              if (fromDate && itemDate < fromDate) return false;
              if (toDate && itemDate > toDate) return false;
              return true;
            });
          }
          break;
      }
    });

    return result;
  }, [normalizedData, searchQuery, filterValues, filters, searchableColumns]);

  // Получаем данные для текущей страницы
  const paginatedData = filteredData.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Вычисляем общее количество страниц на основе отфильтрованных данных
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleEdit = (item: N) => {
    const originalItem =
      // @ts-ignore
      data?.find((i) => i[`id_${tableName}`] === item[`id_${tableName}`]) || null;
    setSelected(originalItem);
    setModalOpened(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setModalOpened(true);
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setActivePage(1); // Сбрасываем страницу при изменении фильтров
  };

  const handleFilterReset = () => {
    setFilterValues({});
    setActivePage(1);
  };

  // Подготавливаем фильтры с options из relationsData
  const preparedFilters = useMemo(() => {
    return filters.map((filter) => {
      if (filter.type === 'select' && filter.relationKey) {
        // @ts-ignore
        const relationData = relationsData[filter.relationKey] || [];
        return {
          ...filter,
          options: filter.getOptions(relationData),
        };
      }
      return filter;
    });
  }, [filters, relationsData]);

  const modalProps = {
    opened: modalOpened,
    onClose: () => setModalOpened(false),
    data: selected,
    refetch,
    tableName,
    formColumns,
    idField,
    relations: formRelations,
  };

  return (
    <>
      <Group mb="md" justify="space-between">
        <Group>
          <TextInput
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            style={{ maxWidth: '300px' }}
          />
          {filters.length > 0 && (
            <Button
              variant="light"
              leftSection={<IconFilter size={16} />}
              onClick={() => setFilterDrawerOpened(true)}
            >
              Фильтры
            </Button>
          )}
        </Group>
        {showAddButton && (
          <ActionIcon variant="filled" color="blue" onClick={handleAdd} size="lg">
            <IconPlus size={20} />
          </ActionIcon>
        )}
      </Group>

      <TableSort
        // @ts-ignore
        data={paginatedData}
        columns={columns}
        // @ts-ignore
        onRowClick={handleEdit}
      />

      {totalPages > 1 && (
        <Group justify="flex-end" mt="md">
          <Pagination value={activePage} onChange={setActivePage} total={totalPages} />
        </Group>
      )}

      <Drawer
        opened={filterDrawerOpened}
        onClose={() => setFilterDrawerOpened(false)}
        title="Фильтры"
        position="right"
        size="sm"
      >
        <FilterPanel
          filters={preparedFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </Drawer>

      {CustomEditModal ? (
        <CustomEditModal {...modalProps} />
      ) : (
        <UniversalEditModal {...modalProps} />
      )}
    </>
  );
};
