import { IBaseColumn, TableType } from '@/shared';

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
export type Position = TableType<PositionColumns>;
