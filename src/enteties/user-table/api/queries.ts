import { useQuery } from '@tanstack/react-query';
import { tableApi } from './api';
import { ColumnTypeToValue } from '@/shared/model';

export const useTableData = <
  T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
>(
  tableName: string
) => {
  return useQuery<T[]>({
    queryKey: ['table', tableName],
    queryFn: () => tableApi.getTableData<T>(tableName),
  });
};
