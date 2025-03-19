import { ITableColumn } from '@/shared';
import { NormalizedOrder } from './types';

export const ORDER_COLUMNS: ITableColumn<NormalizedOrder>[] = [
  {
    key: 'id_order',
    label: 'ID',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.id_order,
  },
  {
    key: 'date',
    label: 'Дата',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.date,
  },
  {
    key: 'client',
    label: 'Клиент',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.client,
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
    key: 'status',
    label: 'Статус',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.status,
  },
];
