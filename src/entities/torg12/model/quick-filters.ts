import { QuickFilter } from '@/shared';

// Создаем фабрику для быстрых фильтров на основе данных из таблицы
export const createTorg12QuickFilters = (statusData: any[]): QuickFilter[] => {
  return [
    {
      id: 'all',
      label: 'Все',
      field: 'status',
      value: null,
    },
    // Создаем фильтры из данных таблицы статусов
    ...statusData.map((status) => ({
      id: status.id_status,
      label: status.name,
      field: 'status',
      value: status.id_status,
    })),
  ];
};
