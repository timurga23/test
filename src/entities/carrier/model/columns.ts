import { ITableColumn } from '@/shared';
import { NormalizedCarrier } from './types';

export const CARRIER_COLUMNS: ITableColumn<NormalizedCarrier>[] = [
  {
    key: 'name',
    label: 'Баланс',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.name,
  },
  {
    key: 'balance',
    label: 'Факт',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => `${Number(row.balance)?.toLocaleString()} ₽`,
  },
];


