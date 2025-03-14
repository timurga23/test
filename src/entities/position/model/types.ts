import { ColumnTypeToValue, IBaseColumn } from '@/shared';

interface PositionColumns {
  id_position: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    unique: true;
    nullable: false;
  };
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
}

// Тип для значений в таблице
export type Position = {
  [K in keyof PositionColumns]: PositionColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[PositionColumns[K]['type']] | null
    : ColumnTypeToValue[PositionColumns[K]['type']];
};
