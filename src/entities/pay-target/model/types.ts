import { IBaseColumn, TableType } from '@/shared';

interface PayTargetColumns {
  id_pay_target: IBaseColumn & {
    type: 'UUID';
    nullable: true;
  };
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  relevance: IBaseColumn & {
    type: 'INTEGER';
    nullable: true;
  };
}

// Тип для значений в таблице
export type PayTarget = TableType<PayTargetColumns>;

export interface NormalizedPayTarget {
  name: PayTarget['name'];
  balance?: number;
}
