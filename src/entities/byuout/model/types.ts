import { IBaseColumn, TableType } from '@/shared';

export interface BuyoutColumns {
  id_buyout: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  numb_buyout: IBaseColumn & {
    type: 'INTEGER';
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
  id_employee: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_card: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_operation_card: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_operation_safe: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  rate: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_rate: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  rate_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_rate_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  price: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_price: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  agent: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  post_price: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_post_price: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  pre_price_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_pre_price_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  price_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_price_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  id_pay_target: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
}

export type Buyout = TableType<BuyoutColumns>;

export interface NormalizedBuyout extends Buyout {
  date_pay: string;
  client_name: string;
  rate: number;
  rate_client: number;
  price: number;
  price_client: number;
  delta: number;
  pay_target_name: string;
}
