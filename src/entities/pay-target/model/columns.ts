import { ITableColumn } from '@/shared';
import { NormalizedPayTarget } from './types';

export const PAY_TARGET_COLUMNS: ITableColumn<NormalizedPayTarget>[] = [
  {
    key: 'name',
    label: 'Название',
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


