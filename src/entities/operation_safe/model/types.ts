import { IBaseColumn, TableType } from '@/shared';

export interface OperationSafeColumns {
  id_operation_safe: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  sours: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_direction_safe: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  id_card: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  date: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  id_type_operation: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  summ: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_summ: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  description: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  id_operation_card: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
}

export type OperationSafe = TableType<OperationSafeColumns>;

export interface NormalizedOperationSafe extends OperationSafe {
  direction_safe_name: string;
  card_number?: string;
  type_operation_name: string;
  operation_card_number?: string;
}
