import { ColumnTypeToValue, IBaseColumn } from '@/shared';
// import { EMPLOYEE_TABLE_NAME } from './_constant';
// Типизация конкретной таблицы Employee
interface EmployeeColumns {
  id_employee: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    unique: true;
    nullable: false;
  };
  last_name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  first_name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  middle_name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  birth_date: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  phone: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  relevance: IBaseColumn & {
    type: 'BOOLEAN';
    nullable: true;
    defaultValue: 'false';
  };
  login: IBaseColumn & {
    type: 'TEXT';
    unique: true;
    nullable: false;
  };
  password: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_employee_replacement: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
}

// Тип для значений в таблице (используя ColumnTypeToValue)
export type Employee = {
  [K in keyof EmployeeColumns]: EmployeeColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[EmployeeColumns[K]['type']] | null
    : ColumnTypeToValue[EmployeeColumns[K]['type']];
};

// Типизация самой таблицы
// interface EmployeeTable extends ITable {
//   name: typeof EMPLOYEE_TABLE_NAME;
//   columns: Array<EmployeeColumns[keyof EmployeeColumns]>;
// }
