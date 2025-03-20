import { ITableColumn } from '@/shared';
import { NormalizedOrder } from './types';

export const ORDER_COLUMNS: ITableColumn<NormalizedOrder>[] = [
  {
    key: 'date',
    label: 'Дата',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => new Date(String(row.date)).toLocaleDateString(),
  },
  {
    key: 'client_name',
    label: 'Клиент',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.client_name,
  },
  {
    key: 'position',
    label: 'Позиция',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.position,
  },
  {
    key: 'amount',
    label: 'Сумма',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.amount,
  },
  {
    key: 'rate',
    label: 'Курс',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.rate,
  },

  {
    key: 'commission',
    label: 'Комиссия',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.commission,
  },
  {
    key: 'status_name',
    label: 'Статус',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => row.status_name,
  },
];
