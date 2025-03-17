import { IBaseColumn, TableType } from '@/shared';

interface RateColumns {
  id_rate: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    unique: true;
    nullable: false;
  };
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: false;
  };
  value: IBaseColumn & {
    type: 'INTEGER';
    nullable: false;
  };
  point_value: IBaseColumn & {
    type: 'INTEGER';
    nullable: false;
  };
}

export type Rate = TableType<RateColumns>;

export interface NormalizedRate extends Omit<Rate, 'id_rate'> {
  rate: Rate['name'];
  value: Rate['value'];
}
