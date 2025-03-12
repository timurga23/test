import { ColumnTypeToValue, IColumn } from '@/shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TableRowAdd, TableUpdates } from '../model/types';
import { tableApi } from './api';

export const useTableData = <
  T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
>(
  tableName: string
) => {
  return useQuery<T[]>({
    queryKey: ['table', tableName],
    queryFn: () => tableApi.getTableData<T>(tableName),
    staleTime: 0, // Отключаем кэширование
  });
};

export const useUpdateTableData = <
  T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
>() => {
  return useMutation({
    mutationFn: ({ tableName, data }: { tableName: string; data: TableUpdates }) =>
      tableApi.updateTableData<T>(tableName, data),
  });
};

export const useAddTableData = <
  T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
>() => {
  return useMutation({
    mutationFn: ({ tableName, data }: { tableName: string; data: TableRowAdd[] }) =>
      tableApi.addTableData<T>(tableName, data),
  });
};

export const useDeleteTableRow = <
  T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
>() => {
  return useMutation({
    mutationFn: ({ tableName, data }: { tableName: string; data: IColumn[] }) =>
      tableApi.deleteTableRow<T>(tableName, data),
  });
};
