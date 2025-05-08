import { IBaseColumn, TableType } from '@/shared';

export interface CorrectionColumns {
  id_correction: IBaseColumn & {
    type: 'UUID';
    nullable: false;
  };
  numb_correction: IBaseColumn & {
    type: 'INTEGER';
    nullable: false;
  };
  date: IBaseColumn & {
    type: 'DATE';
    nullable: true;
  };
  description: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  amount: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  point_amount: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
  id_pay_target: IBaseColumn & {
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
}

export type Correction = TableType<CorrectionColumns>;

export interface NormalizedCorrection extends Correction {
  pay_target_name: string;
  operation_card_number?: string;
  card_number?: string;
  income: number;
  outcome: number;
}
