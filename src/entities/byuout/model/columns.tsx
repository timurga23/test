import { ITableColumn } from '@/shared';
import { NormalizedBuyout } from './types';

export const BUYOUT_COLUMNS: ITableColumn<NormalizedBuyout>[] = [
  {
    key: 'date_pay',
    label: 'Дата',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => (row.date_pay ? new Date(row.date_pay).toLocaleDateString() : ''),
  },
  {
    key: 'client_name',
    label: 'Клиент',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.client_name,
  },
  {
    key: 'rate',
    label: 'Курс',
    sortable: true,
    width: 'auto',
    minWidth: 100,
    render: (row) => row.rate,
  },
  {
    key: 'rate_client',
    label: 'Курс клиента',
    sortable: true,
    width: 'auto',
    minWidth: 100,
    render: (row) => row.rate_client,
  },
  {
    key: 'price',
    label: 'Покупка',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => row.price,
  },
  {
    key: 'price_client',
    label: 'Продажа',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => row.price_client,
  },
  {
    key: 'delta',
    label: 'Дельта',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => Number(row?.price_client) - Number(row?.price),
  },
  {
    key: 'pay_target_name',
    label: 'Цель оплаты',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.pay_target_name,
  },
];
