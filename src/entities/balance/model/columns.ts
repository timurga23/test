import { ITableColumn } from '@/shared';
import { NormalizedBalance } from './types';

export const BALANCE_COLUMNS: ITableColumn<NormalizedBalance>[] = [
  {
    key: 'name',
    label: 'Наименование',
    width: 'auto',
    minWidth: 150,
    render: (row) => row.name,
  },
];
