import { IBaseColumn, TableType } from '@/shared';

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

export type Bank = TableType<BankColumns>;
