import { useTableData } from '@/entities/user-table';
import { UniversalEditModal } from '@/shared/ui';
import { TableSort } from '@/shared/ui/table/table';
import {
  ActionIcon,
  Button,
  Drawer,
  Flex,
  Group,
  Pagination,
  SegmentedControl,
  TextInput,
} from '@mantine/core';
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
  quickFilters?: (data: any[]) => Filter[];
  quickFilterRelation?: {
    tableName: string;
  };
  additionalBlock?: React.ReactNode;
}

// Добавим вспомогательные функции для работы с датами
const setStartOfDay = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};

const setEndOfDay = (date: Date) => {
  date.setHours(23, 59, 59, 999);
  return date;
};

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
  quickFilters,
  quickFilterRelation,
  isSearchable = true,
  additionalBlock = null,
}: CrudTableProps<T, N>) => {
  const [selected, setSelected] = useState<N | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string>('all');

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

  // Получаем данные для быстрых фильтров
  const { data: quickFilterData } = useTableData(quickFilterRelation?.tableName || '');

  // Создаем быстрые фильтры
  const preparedQuickFilters = useMemo(() => {
    if (quickFilters && typeof quickFilters === 'function' && quickFilterData) {
      return quickFilters(quickFilterData);
    }
  }, [quickFilters, quickFilterData]);

  // Обработчик быстрых фильтров
  const handleQuickFilterChange = (filterId: string) => {
    // @ts-ignore
    const filter = preparedQuickFilters?.find((f) => f.id === filterId);
    setActiveQuickFilter(filterId);

    if (filter && filter.label !== 'Все') {
      // Обновляем общий state фильтров
      setFilterValues((prev) => ({
        ...prev,
        [filter.field]: filter?.label,
      }));
    } else if (filterId === 'all') {
      // Если выбран "Все", очищаем соответствующий фильтр
      // @ts-ignore
      const firstFilter = preparedQuickFilters?.[0];
      if (firstFilter) {
        setFilterValues((prev) => ({
          ...prev,
          [firstFilter.field]: null,
        }));
      }
    }
  };

  // Обработчик обычных фильтров
  const handleFilterChange = (field: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Если изменяется поле, которое связано с быстрым фильтром,
    // обновляем активный быстрый фильтр
    // @ts-ignore
    const quickFilter = preparedQuickFilters?.find((f) => f.field === field && f.value === value);
    if (quickFilter) {
      // @ts-ignore
      setActiveQuickFilter(quickFilter?.id);
    } else if (value === null) {
      setActiveQuickFilter('all');
    }
  };

  // В функции фильтрации обновляем логику работы с датами
  const filteredData = useMemo(() => {
    let result = normalizedData;

    // Применяем поиск
    if (searchQuery) {
      // @ts-ignore
      result = result.filter((item) => {
        return searchableColumns.some((column) => {
          // @ts-ignore
          const value = String(item[column] || '').toLowerCase();
          return value.includes(searchQuery.toLowerCase());
        });
      });
    }

    // Применяем все фильтры
    Object.entries(filterValues).forEach(([field, value]) => {
      if (value !== null) {
        // Проверяем, является ли это date-range фильтром
        const isDateRange = filters.some(
          (f) => f.type === 'date-range' && f.field === field.replace(/_from|_to$/, '')
        );

        if (isDateRange) {
          const baseField = field.replace(/_from|_to$/, '');
          const isFromFilter = field.endsWith('_from');
          const isToFilter = field.endsWith('_to');

          // @ts-ignore
          result = result.filter((item) => {
            // @ts-ignore
            const itemDate = new Date(item[baseField]);

            if (isFromFilter && value) {
              const fromDate = setStartOfDay(new Date(value));
              return itemDate >= fromDate;
            }
            if (isToFilter && value) {
              const toDate = setEndOfDay(new Date(value));
              return itemDate <= toDate;
            }
            return true;
          });
        } else {
          // Обычная фильтрация для не date-range полей
          // @ts-ignore
          result = result.filter((item) => {
            // @ts-ignore
            const fieldValue = item[field];
            const filterField = filters.find((f) => f.field === field);
            return (
              fieldValue === value ||
              Array.isArray((item as any)[field]) && (item as any)[field]?.find((f: any) => f[filterField as any]?.searchField === value) ||
              (item as any)[field]?.includes(value)
            );
          });
        }
      }
    });

    return result;
  }, [normalizedData, searchQuery, filterValues, searchableColumns, filters]);

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

  const handleFilterReset = () => {
    setFilterValues({});
    setActivePage(1);
  };

  // Подготавливаем фильтры с options из relationsData
  const preparedFilters = useMemo(() => {
    return filters.map((filter) => {
      if (filter.type === 'select' && filter.relationKey) {
        if (Array.isArray(filter.relationKey)) {
          // Если relationKey это массив, собираем данные из всех таблиц
          const combinedData = filter.relationKey.reduce(
            (acc, tableName) => ({
              ...acc,
              [tableName]: relationsData[tableName] || [],
            }),
            {}
          );

          return {
            ...filter,
            // @ts-ignore
            options: filter.getOptions(combinedData),
          };
        } else {
          // Старая логика для одиночной таблицы
          const relationData = relationsData[filter.relationKey] || [];
          return {
            ...filter,
            options: filter.getOptions(relationData),
          };
        }
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
      <Flex mb="md" gap={16} direction="column">
        <Group>
          {isSearchable && (
            <TextInput
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<IconSearch size={16} />}
              style={{ maxWidth: '300px' }}
            />
          )}
          {filters.length > 0 && (
            <Button
              variant="light"
              leftSection={<IconFilter size={16} />}
              onClick={() => setFilterDrawerOpened(true)}
            >
              Фильтры
            </Button>
          )}
          {additionalBlock}
          {showAddButton && (
            <ActionIcon variant="filled" color="blue" onClick={handleAdd} size="lg">
              <IconPlus size={20} />
            </ActionIcon>
          )}
        </Group>
        {preparedQuickFilters && preparedQuickFilters.length > 0 && (
          <SegmentedControl
            value={activeQuickFilter}
            onChange={handleQuickFilterChange}
            // @ts-ignore
            data={preparedQuickFilters.map((filter) => ({
              // @ts-ignore
              value: filter?.id,
              label: filter?.label,
            }))}
          />
        )}
      </Flex>

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
