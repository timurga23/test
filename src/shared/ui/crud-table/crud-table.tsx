import { useTableData } from '@/entities/user-table';
import { UniversalEditModal } from '@/shared/ui';
import { TableSort } from '@/shared/ui/table/table';
import { ActionIcon, Button, Drawer, Group, Pagination, TextInput } from '@mantine/core';
import { IconFilter, IconPlus, IconSearch } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FilterPanel } from '../filter-panel/filter-panel';
import { Filter } from '../filter-panel/types';

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
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
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
  modalSize = 'lg',
}: CrudTableProps<T, N>) => {
  const [selected, setSelected] = useState<N | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading: isMainLoading } = useTableData<T>(tableName);

  // Получаем данные и состояния загрузки для связанных таблиц
  const { relationsData, relationsLoading }: any = Object.entries(relations).reduce(
    //@ts-ignore
    (acc, [table]) => {
      const { data: relationData, isLoading } = useTableData(table);
      return {
        relationsData: { ...acc.relationsData, [table]: relationData },
        relationsLoading: [...acc.relationsLoading, isLoading],
      };
    },
    { relationsData: {}, relationsLoading: [] }
  );

  // Получаем состояния загрузки для таблиц из formRelations
  const formRelationsLoadingStates = Object.entries(formRelations).map(([_, relation]) => {
    const { isLoading } = useTableData(relation.tableName);
    return isLoading;
  });

  // Общее состояние загрузки
  const isLoading =
    isMainLoading ||
    relationsLoading.some((state: any) => state) ||
    formRelationsLoadingStates.some((state: any) => state);

  const normalizedData = normalizeData ? normalizeData(data || [], relationsData) : data || [];

  // Применяем фильтры к данным
  const filteredData = useMemo(() => {
    let result = normalizedData;

    // Применяем поиск
    if (searchQuery) {
      // @ts-ignore
      result = result.filter((item) => {
        return searchableColumns.some((column) => {
          const value = String(item[column as keyof typeof item] || '')?.toLowerCase();
          return value.includes(searchQuery?.toLowerCase());
        });
      });
    }

    // Применяем фильтры
    // @ts-ignore
    result = result.filter((item) => {
      return filters.every((filter) => {
        switch (filter.type) {
          case 'select':
            if (filterValues[filter.field]) {
              const fieldValue = filter.valueField
                ? // @ts-ignore
                  item[filter.valueField] // используем valueField если указано
                : // @ts-ignore
                  item[filter.field]; // иначе используем field

              console.log(112, 'fieldValue', fieldValue, filterValues[filter.field]);

              if (Array.isArray(fieldValue) && filter.searchField) {
                return fieldValue.some(
                  // @ts-ignore
                  (obj) => obj[filter.searchField] === filterValues[filter.field]
                );
              }

              return fieldValue === filterValues[filter.field];
            }
            return true;

          case 'date-range':
            const fromDate = filterValues[`${filter.field}_from`];
            const toDate = filterValues[`${filter.field}_to`];
            if (fromDate || toDate) {
              // @ts-ignore
              const itemDate = new Date(item[filter.field]);
              if (fromDate && itemDate < fromDate) return false;
              if (toDate && itemDate > toDate) return false;
            }
            return true;

          default:
            return true;
        }
      });
    });

    return result;
  }, [normalizedData, searchQuery, filterValues, filters, searchableColumns]);

  console.log(112115, filteredData);

  // Получаем данные для текущей страницы
  const paginatedData = filteredData.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Вычисляем общее количество страниц на основе отфильтрованных данных
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleEdit = (item: N) => {
    setSelected(item);
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

  const handleRefetch = () => {
    // Рефетчим основную таблицу
    queryClient.invalidateQueries({ queryKey: ['table', tableName] });

    // Рефетчим связанные таблицы
    Object.entries(relations).forEach(([table]) => {
      queryClient.invalidateQueries({ queryKey: ['table', table] });
    });

    // Рефетчим таблицы из formRelations
    Object.entries(formRelations).forEach(([_, relation]) => {
      queryClient.invalidateQueries({ queryKey: ['table', relation.tableName] });
    });
  };

  const modalProps = {
    opened: modalOpened,
    onClose: () => setModalOpened(false),
    data: selected,
    refetch: handleRefetch,
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
        isLoading={isLoading}
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
        // @ts-ignore
        <UniversalEditModal {...modalProps} modalSize={modalSize} idField={idField} />
      )}
    </>
  );
};
