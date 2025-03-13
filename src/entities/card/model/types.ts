import { ColumnTypeToValue, IBaseColumn } from '@/shared';

interface CardColumns {
  id_card: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    unique: true;
    nullable: false;
  };
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  fio: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  number: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_bank: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  description: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_employee: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  limit_amount: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  blocking: IBaseColumn & {
    type: 'BOOLEAN';
    nullable: true;
    defaultValue: 'false';
  };
}

// Тип для значений в таблице
export type Card = {
  [K in keyof CardColumns]: CardColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[CardColumns[K]['type']] | null
    : ColumnTypeToValue[CardColumns[K]['type']];
};
