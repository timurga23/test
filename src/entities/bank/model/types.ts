import { ColumnTypeToValue, IBaseColumn } from "@/shared";

interface BankColumns {
  id_bank: IBaseColumn & {
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
export type Bank = {
  [K in keyof BankColumns]: BankColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[BankColumns[K]['type']] | null
    : ColumnTypeToValue[BankColumns[K]['type']];
};
