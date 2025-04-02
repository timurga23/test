import {
  CORRECTION_COLUMNS,
  CORRECTION_FORM_COLUMNS,
  Correction,
  NormalizedCorrection,
} from '@/entities/correction';
import { CrudTable } from '@/shared/ui';
import { CORRECTION_TABLE_FORM_RELATIONS, CORRECTION_TABLE_RELATIONS } from '../_constant';

export const CorrectionTable = () => {
  const normalizeData = (
    corrections: Correction[],
    relations: {
      pay_target: any[];
      card: any[];
      operation_card: any[];
    }
  ): NormalizedCorrection[] => {
    return corrections.map((correction) => {
      const payTarget = relations.pay_target?.find(
        (target) => target.id_pay_target === correction.id_pay_target
      );

      const card = relations.card?.find((card) => card.id_card === correction.id_card);

      const operationCard = relations.operation_card?.find(
        (card) => card.id_operation_card === correction.id_operation_card
      );

      const amount = correction.amount || 0;

      return {
        ...correction,
        pay_target_name: payTarget?.name || '',
        card_number: card?.number || '',
        operation_card_number: operationCard?.number || '',
        income: amount > 0 ? amount : 0,
        outcome: amount < 0 ? amount : 0,
      };
    });
  };

  return (
    <CrudTable<Correction, NormalizedCorrection>
      tableName="correction"
      columns={CORRECTION_COLUMNS}
      formColumns={CORRECTION_FORM_COLUMNS}
      idField="id_correction"
      normalizeData={normalizeData}
      modalSize="md"
      searchableColumns={['description', 'pay_target_name']}
      // @ts-ignore
      relations={CORRECTION_TABLE_RELATIONS}
      // @ts-ignore
      formRelations={CORRECTION_TABLE_FORM_RELATIONS}
    />
  );
};
