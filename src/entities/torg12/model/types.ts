import { IBaseColumn, TableType } from '@/shared';

export interface Torg12Columns {
  id_torg12: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  date: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  id_client: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  cost: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  fee: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  income: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  expense: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  profit: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  id_card: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_balance: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  status: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_operation_card: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_balance_supplier: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  fee_supplier: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
}

export type Torg12 = TableType<Torg12Columns>;

export interface NormalizedTorg12 extends Torg12 {
  date: string;
  client_name: string;
  cost: number;
  income: number;
  expense: number;
  profit: number;
  supplier_name: string;
  status: string;
  purpose: string;
}
