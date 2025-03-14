import { ITableColumn } from '@/shared';
import { NormalizedRate } from './types';

export const RATE_COLUMNS: ITableColumn<NormalizedRate>[] = [
  {
    key: 'name',
    label: 'Наименование',
    width: 'auto',
    minWidth: 150,
    render: (row) => row.name,
  },
  {
    key: 'value',
    label: 'Значение',
    width: 'auto',
    minWidth: 150,
    render: (row) => row.value,
  },
];
