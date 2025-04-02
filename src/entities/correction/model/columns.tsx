import { ITableColumn } from '@/shared';
import { NormalizedCorrection } from './types';

export const CORRECTION_COLUMNS: ITableColumn<NormalizedCorrection>[] = [
  {
    key: 'date',
    label: 'Дата',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => (row.date ? new Date(row.date).toLocaleDateString() : ''),
  },
  {
    key: 'description',
    label: 'Описание',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.description,
  },
  {
    key: 'income',
    label: 'Доход',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => (row?.income > 0 ? row.income : ''),
  },
  {
    key: 'outcome',
    label: 'Расход',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => (row?.outcome < 0 ? row.outcome : ''),
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
