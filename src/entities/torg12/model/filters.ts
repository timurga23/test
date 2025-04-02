import { Filter } from '@/shared/ui/filter-panel/types';

export const TORG12_FILTERS: Filter[] = [
  {
    type: 'select',
    field: 'status',
    label: 'Статус',
    relationKey: 'status',
    searchField: 'status',
    getOptions: (data) =>
      data?.map((item: any) => ({
        // Маппим значение из таблицы статусов в значение для торг12
        value: item.name,
        label: item.name,
      })) || [],
    // Добавляем функцию преобразования значения при фильтрации
  },
  {
    type: 'select',
    field: 'id_balance',
    label: 'Поставщик',
    relationKey: 'balance',
    searchField: 'balance',
    getOptions: (data) =>
      data?.map((item: any) => ({
        value: item.id_balance,
        label: item.name,
      })) || [],
  },
  // todo
  {
    type: 'select',
    field: 'purpose',
    label: 'Назначение',
    relationKey: ['card', 'balance'],
    searchField: 'purpose',
    getOptions: (data) => {
      return [
        // @ts-ignore
        ...(data?.card || []).map((item: any) => ({
          value: `Карта: ${item.name}`,
          label: `Карта: ${item.name}`,
        })),
        // @ts-ignore
        ...(data?.balance || []).map((item: any) => ({
          value: `Баланс: ${item.name}`,
          label: `Баланс: ${item.name}`,
        })),
      ];
    },
  },
  {
    type: 'date-range',
    field: 'date',
    label: 'Дата',
  },
];
