import { Center, Group, Skeleton, Table, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export interface ITableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
  minWidth?: number;
}

interface TableSortProps<T extends Record<string, any>> {
  data: T[];
  columns: ITableColumn<T>[];
  onRowClick?: (row: T) => void;
  isSearchable?: boolean;
  isLoading?: boolean;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
  sortable?: boolean;
  width?: string;
  minWidth?: number;
}

function Th({ children, reversed, sorted, onSort, sortable = false, width, minWidth }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  const style = {
    width: width || 'auto',
    minWidth: minWidth ? `${minWidth}px` : 'auto',
  };

  if (!sortable) {
    return (
      <Table.Th style={style}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
        </Group>
      </Table.Th>
    );
  }

  return (
    <Table.Th style={style}>
      <UnstyledButton onClick={onSort} className={styles.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={styles.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData<T>(data: T[], search: string) {
  const query = search?.toLowerCase()?.trim();
  return data.filter((item) => {
    const objectKeys = Object.keys(item as Record<string, any>);

    return objectKeys.some((key) => {
      const value = (item as Record<string, any>)[key];
      return value?.toString()?.toLowerCase().includes(query);
    });
  });
}

function sortData<T>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      // @ts-ignore
      const aValue = (a as Record<string, any>)[sortBy];
      // @ts-ignore
      const bValue = (b as Record<string, any>)[sortBy];

      if (!aValue || !bValue) return 0;

      if (payload.reversed) {
        return bValue.toString().localeCompare(aValue.toString());
      }

      return aValue.toString().localeCompare(bValue.toString());
    }),
    payload.search
  );
}

export const TableSort = <T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  isLoading,
}: TableSortProps<T>) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search: '' }));
  };

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Th
                key={String(column.key)}
                sorted={sortBy === column.key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(column.key as keyof T)}
                sortable={column.sortable}
                width={column.width}
                minWidth={column.minWidth}
              >
                {column.label}
              </Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {isLoading
            ? // Скелетон с тем же количеством строк, что и в данных
              Array.from({ length: data.length || 10 }).map((_, rowIndex) => (
                <Table.Tr key={`skeleton-${rowIndex}`}>
                  {columns.map((column, colIndex) => (
                    <Table.Td
                      key={`skeleton-${rowIndex}-${colIndex}`}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                      }}
                    >
                      <Skeleton height={24} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            : sortedData.map((row) => (
                <Table.Tr
                  // @ts-ignore
                  key={row?.id}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((column) => (
                    // @ts-ignore
                    <Table.Td key={column.key}>
                      {column.render ? column.render(row) : row[column.key]}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
