import {
  NormalizedOperationCard,
  OPERATION_CARD_COLUMNS,
  OPERATION_CARD_FORM_COLUMNS,
  OPERATION_CARD_TABLE_NAME,
  OperationCard,
} from '@/entities';
import { CrudTable } from '@/shared/ui';

export const OperationCardTable = () => {
  const normalizeData = (
    operations: OperationCard[],
    relations: { card: any[]; type_operation: any[] }
  ): NormalizedOperationCard[] => {
    return operations.map((operation) => ({
      ...operation,
      card: relations.card?.find((card) => card.id_card === operation.id_card)?.name || '',
      type_operation:
        relations.type_operation?.find(
          (type) => type.id_type_operation === operation.id_type_operation
        )?.name || '',
    }));
  };

  return (
    <CrudTable<OperationCard, NormalizedOperationCard>
      tableName={OPERATION_CARD_TABLE_NAME}
      columns={OPERATION_CARD_COLUMNS}
      formColumns={OPERATION_CARD_FORM_COLUMNS}
      idField="id_operation_card"
      normalizeData={normalizeData}
      relations={{
        card: 'card',
        type_operation: 'type_operation',
      }}
    />
  );
};
