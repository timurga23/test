import { ColumnTypeToValue, IBaseColumn } from '@/shared';

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

// Тип для значений в таблице
export type Rate = {
  [K in keyof RateColumns]: RateColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[RateColumns[K]['type']] | null
    : ColumnTypeToValue[RateColumns[K]['type']];
};

export interface NormalizedRate extends Omit<Rate, 'id_rate'> {
  rate: Rate['name'];
  value: Rate['value'];
}
