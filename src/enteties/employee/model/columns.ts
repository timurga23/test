import { ITableColumn } from '@/shared';
import { NormalizedEmployee } from '../lib/mapEmployeeData';

export const EMPLOYEE_COLUMNS: ITableColumn<NormalizedEmployee>[] = [
  {
    key: 'fullName',
    label: 'ФИО',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.fullName,
  },
  {
    key: 'position',
    label: 'Должность',
    sortable: true,
    width: 'auto',
    minWidth: 150,
    render: (row) => row.position,
  },
];
