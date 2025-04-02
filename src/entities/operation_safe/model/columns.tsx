import { ITableColumn } from '@/shared';
import { NormalizedOperationSafe } from './types';

export const OPERATION_SAFE_COLUMNS: ITableColumn<NormalizedOperationSafe>[] = [
  {
    key: 'date',
    label: 'Дата',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => (row.date ? new Date(row.date).toLocaleDateString() : ''),
  },
  {
    key: 'type_operation_name',
    label: 'Тип операции',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.type_operation_name,
  },
  {
    key: 'direction_safe_name',
    label: 'Связь',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.direction_safe_name,
  },
  {
    key: 'summ',
    label: 'Сумма',
    sortable: true,
    width: 'auto',
    minWidth: 120,
    render: (row) => row.summ,
  },
  {
    key: 'description',
    label: 'Примечание',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.description,
  },
];
