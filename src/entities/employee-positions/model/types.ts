import { ColumnTypeToValue, IBaseColumn } from '@/shared';

// Типизация конкретной таблицы EmployeePositions
interface EmployeePositionsColumns {
  id_employee: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_position: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
}

// Тип для значений в таблице (используя ColumnTypeToValue)
export type EmployeePosition = {
  [K in keyof EmployeePositionsColumns]: EmployeePositionsColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[EmployeePositionsColumns[K]['type']] | null
    : ColumnTypeToValue[EmployeePositionsColumns[K]['type']];
};
