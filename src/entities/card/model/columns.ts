import { ITableColumn } from '@/shared';
import { NormalizedCard } from '../../../widgets/card-table/model/types';

export const CARD_COLUMNS: ITableColumn<NormalizedCard>[] = [
  {
    key: 'name',
    label: 'Наименование',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.name,
  },
  {
    key: 'fio',
    label: 'Держатель',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.fio,
  },
  {
    key: 'bank',
    label: 'Банк',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.bank,
  },
  {
    key: 'number',
    label: 'Номер',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.number,
  },
  {
    key: 'employee',
    label: 'Ответственный',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.employee,
  },
  {
    key: 'blocking',
    label: 'Активный',
    sortable: true,
    width: '100',
    render: (row) => (row.blocking ? 'Да' : 'Нет'),
  },
  {
    key: 'limit_amount',
    label: 'Баланс',
    sortable: true,
    width: '120',
    render: (row) => `${row.limit_amount?.toLocaleString() ?? 0} ₽`,
  },
];
