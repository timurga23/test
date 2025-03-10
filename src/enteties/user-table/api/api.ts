import { apiRequest } from '@/shared/lib/api-request';
import { ColumnTypeToValue } from '@/shared/model';

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
};
