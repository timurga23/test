import { ITableColumn } from '@/shared';

interface EmployeePosition {
  id_employee: string;
  id_position: string;
}

export const EMPLOYEE_POSITION_COLUMNS: ITableColumn<EmployeePosition>[] = [
  {
    key: 'id_employee',
    label: 'ID Сотрудника',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.id_employee,
  },
  {
    key: 'id_position',
    label: 'ID Должности',
    sortable: true,
    width: 'auto',
    minWidth: 200,
    render: (row) => row.id_position,
  },
];
