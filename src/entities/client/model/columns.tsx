import { ITableColumn, TableLink } from '@/shared';
import { NormalizedClient } from './types';

export const CLIENT_COLUMNS: ITableColumn<NormalizedClient>[] = [
  {
    key: 'numb_client',
    label: '#',
    sortable: true,
    width: 'max-content',
    minWidth: 10,
    render: (row) => row.numb_client,
  },
  {
    key: 'name',
    label: 'ФИО',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.name,
  },
  {
    key: 'phone_number',
    label: 'Телефон',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.phone_number,
  },
  {
    key: 'city',
    label: 'Город',
    sortable: true,
    width: 'auto',
    render: (row) => row.city,
  },
  {
    key: 'link_table',
    label: 'Ссылка',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => <TableLink link={row.link_table} text={'Таблица'} />,
  },
  {
    key: 'bitrix',
    label: 'Bitrix',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => <TableLink link={row.bitrix} text={'Bitrix'} />,
  },
];
