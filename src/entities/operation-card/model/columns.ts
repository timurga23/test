import { ITableColumn } from '@/shared';
import { NormalizedOperationCard } from './types';

export const OPERATION_CARD_COLUMNS: ITableColumn<NormalizedOperationCard>[] = [
  {
    key: 'date',
    label: 'Дата',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => new Date(String(row.date)).toLocaleDateString(),
  },
  {
    key: 'type_operation',
    label: 'Тип операции',
    sortable: true,
    width: 'auto',
    minWidth: 150,
  },
  {
    key: 'card',
    label: 'Карта',
    sortable: true,
    width: 'auto',
    minWidth: 150,
  },

  {
    key: 'summ',
    label: 'Сумма',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => `${Number(row.summ)?.toLocaleString()} ₽`,
  },
  {
    key: 'description',
    label: 'Описание',
    width: 'auto',
    minWidth: 200,
  },
];
