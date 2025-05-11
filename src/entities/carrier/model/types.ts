import { IBaseColumn, TableType } from '@/shared';

interface CarrierColumns {
  id_carrier: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
}

// Тип для значений в таблице
export type Carrier = TableType<CarrierColumns>;

export interface NormalizedCarrier {
  name: Carrier['name'];
  balance?: number;
}
