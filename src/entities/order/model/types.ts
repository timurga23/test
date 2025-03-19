import { IBaseColumn, TableType } from '@/shared';

interface OrderColumns {
  id_order: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    unique: true;
    nullable: false;
  };
  id_client: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  date: IBaseColumn & {
    type: 'TIMESTAMP';
    nullable: false;
  };
  rate: IBaseColumn & {
    type: 'DECIMAL';
    nullable: false;
  };
  point_rate: IBaseColumn & {
    type: 'DECIMAL';
    nullable: true;
  };
  id_employee: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_status: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  commission: IBaseColumn & {
    type: 'DECIMAL';
    nullable: true;
  };
  id_file: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  name_file: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
}

export type Order = TableType<OrderColumns>;

export type NormalizedOrder = Pick<Order, 'id_order' | 'date' | 'rate' | 'commission'> & {
  client: string;
  position: string;
  amount: number;
  status: string;
};
