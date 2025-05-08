import { ColumnType, ColumnTypeToValue } from './table-types';

// Тип для значений в таблице
export type TableType<T> = {
  [K in keyof T]: T[K] extends { type: ColumnType; nullable: boolean }
    ? T[K]['nullable'] extends true
      ? ColumnTypeToValue[T[K]['type']] | null
      : ColumnTypeToValue[T[K]['type']]
    : never;
};
