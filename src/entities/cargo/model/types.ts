import { IBaseColumn, TableType } from '@/shared';

export interface CargoColumns {
  id_cargo: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  date_pay: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  date_loading: IBaseColumn & {
    type: 'DATE';
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
  id_city_loading: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  date_delivery: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  date_delivery_fact: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  id_city_unloading: IBaseColumn & {
    type: 'UUID';
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
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_type_transport: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  quantity: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  weight: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_weight: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  volume: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_volume: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  tariff_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_tariff_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  tariff_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_tariff_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  insurance_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_insurance_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  insurance_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_insurance_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  packing_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  packing_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  delivery_ch_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  delivery_ch_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  loading_in: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  loading_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_loading_out: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  number_cargo: IBaseColumn & {
    type: 'TEXT';
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
  outgo: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_outgo: IBaseColumn & {
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
  price_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_price_client: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  id_carrier: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_pay_target: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
}

export type Cargo = TableType<CargoColumns>;

export interface NormalizedCargo extends Cargo {
  client_name: string;
  employee_name: string;
  city_loading_name: string;
  city_unloading_name: string;
  carrier_name: string;
  type_transport_name: string;
  pay_target_name: string;
  operation_card_number?: string;
  operation_safe_number?: string;
  card_number?: string;
}
