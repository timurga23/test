import {
  Box,
  Center,
  Flex,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
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
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    const objectKeys = Object.keys(item as Record<string, any>);

    return objectKeys.some((key) => {
      const value = (item as Record<string, any>)[key];
      return value?.toString().toLowerCase().includes(query);
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

export function TableSort<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  isSearchable = false,
}: TableSortProps<T>) {
  const [search, setSearch] = useState('');
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
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={index} onClick={() => onRowClick?.(row)} style={{ cursor: 'pointer' }}>
      {columns.map((column) => (
        <Table.Td key={column.key as string}>
          {column.render ? column.render(row) : String(row[column.key] ?? '-')}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Flex direction="column" gap="md">
      {isSearchable && (
        <TextInput
          placeholder="Поиск"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          w={300}
        />
      )}
      <ScrollArea>
        <Box style={{ width: 'fit-content' }}>
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            layout="fixed"
            style={{ width: 'auto' }}
          >
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
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={columns.length}>
                    <Text fw={500} ta="center">
                      Ничего не найдено
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Box>
      </ScrollArea>
    </Flex>
  );
}
