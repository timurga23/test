import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './index.module.scss';

interface SubColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  subColumns?: SubColumn[];
}

interface TableSortProps<T extends Record<string, any>> {
  data: T[];
  columns: Column[];
  onRowClick?: (row: T) => void;
  isSearchable?: boolean;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
  sortable?: boolean;
  colSpan?: number;
}

function Th({ children, reversed, sorted, onSort, sortable = false, colSpan }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  
  if (!sortable) {
    return (
      <Table.Th className={styles.th} colSpan={colSpan}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
        </Group>
      </Table.Th>
    );
  }

  return (
    <Table.Th className={styles.th} colSpan={colSpan}>
      <UnstyledButton onClick={onSort} className={styles.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={styles.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData<T extends Record<string, any>>(data: T[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.values(item).some((value) => 
      String(value).toLowerCase().includes(query)
    )
  );
}

function sortData<T extends Record<string, any>>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }
      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

export function TableSort<T extends Record<string, any>>({ data, columns, onRowClick, isSearchable = false }: TableSortProps<T>) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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
      {columns.map((column) => {
        if (column.subColumns) {
          return column.subColumns.map((subColumn) => (
            <Table.Td key={subColumn.key}>{row[subColumn.key] ? String(row[subColumn.key]) : '-'}</Table.Td>
          ));
        }
        return <Table.Td key={column.key}>{row[column.key] ? String(row[column.key]) : '-'}</Table.Td>;
      })}
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      {isSearchable && (
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
      )}
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Th
                key={column.key}
                sorted={sortBy === column.key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(column.key as keyof T)}
                sortable={column.sortable}
                colSpan={column.subColumns?.length || 1}
              >
                {column.label}
              </Th>
            ))}
          </Table.Tr>
          {columns.some(col => col.subColumns) && (
            <Table.Tr>
              {columns.map((column) => {
                if (column.subColumns) {
                  return column.subColumns.map((subColumn) => (
                    <Th
                      key={subColumn.key}
                      sorted={sortBy === subColumn.key}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting(subColumn.key as keyof T)}
                      sortable={subColumn.sortable}
                    >
                      {subColumn.label}
                    </Th>
                  ));
                }
                return null;
              })}
            </Table.Tr>
          )}
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.reduce((acc, col) => acc + (col.subColumns?.length || 1), 0)}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
