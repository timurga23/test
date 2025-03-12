import { apiRequest, ColumnTypeToValue, IColumn } from '@/shared';
import { TableRowAdd, TableUpdates } from '../model/types';

export const tableApi = {
  /**
   * Получает данные таблицы
   * @param tableName - Название таблицы
   */
  getTableData: async <T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>>(
    tableName: string
  ): Promise<T[]> => {
    return await apiRequest<T[]>({
      endpoint: `/user/tables/${tableName}`,
      method: 'GET',
    });
  },

  addTableData: async <T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>>(
    tableName: string,
    data: TableRowAdd[]
  ): Promise<T[]> => {
    return await apiRequest<T[]>({
      endpoint: `/user/tables/${tableName}`,
      method: 'POST',
      body: data,
    });
  },

  updateTableData: async <
    T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
  >(
    tableName: string,
    data: TableUpdates
  ): Promise<T[]> => {
    return await apiRequest<T[]>({
      endpoint: `/user/tables/${tableName}`,
      method: 'PUT',
      body: data,
    });
  },

  deleteTableRow: async <
    T extends Record<string, ColumnTypeToValue[keyof ColumnTypeToValue] | null>,
  >(
    tableName: string,
    data: IColumn[]
  ): Promise<T[]> => {
    return await apiRequest<T[]>({
      endpoint: `/user/tables/${tableName}/filter`,
      method: 'DELETE',
      body: data,
    });
  },
};
