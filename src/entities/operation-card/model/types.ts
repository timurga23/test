import { ColumnTypeToValue, IBaseColumn } from '@/shared';

interface OperationCardColumns {
  id_operation_card: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    nullable: false;
  };
  id_card: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  date: IBaseColumn & {
    type: 'BIGINT';
    nullable: true;
  };
  id_type_operation: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  summ: IBaseColumn & {
    type: 'BIGINT';
    nullable: true;
  };
  point_summ: IBaseColumn & {
    type: 'BIGINT';
    nullable: true;
  };
  description: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
}

// Тип для значений в таблице
export type OperationCard = {
  [K in keyof OperationCardColumns]: OperationCardColumns[K]['nullable'] extends true
    ? ColumnTypeToValue[OperationCardColumns[K]['type']] | null
    : ColumnTypeToValue[OperationCardColumns[K]['type']];
};

export interface NormalizedOperationCard {
  date: OperationCard['date'];
  type_operation: OperationCard['id_type_operation'];
  card: OperationCard['id_card'];
  summ: OperationCard['summ'];
  point_summ: OperationCard['point_summ'];
  description: OperationCard['description'];
}
