import { IBaseColumn, TableType } from '@/shared';

interface BalanceColumns {
  id_balance: IBaseColumn & {
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
export type Balance = TableType<BalanceColumns>;

export interface NormalizedBalance extends Omit<Balance, 'id_balance'> {
  balance: Balance['name'];
}
