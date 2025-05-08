import { CARD_TABLE_NAME } from '@/entities';
import {
  NormalizedOperationCard,
  OPERATION_CARD_COLUMNS,
  OPERATION_CARD_FORM_COLUMNS,
  OPERATION_CARD_TABLE_NAME,
  OperationCard,
} from '@/entities/operation-card';
import { CrudTable } from '@/shared/ui';
import { Filter } from '@/shared/ui/filter-panel/types';

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

  const filters: Filter[] = [
    {
      type: 'select',
      field: 'id_card',
      label: 'Карта',
      // @ts-ignore
      relationKey: 'card',
      getOptions: (data: any) =>
        data.map((card: any) => ({
          value: card.id_card,
          label: card.name,
        })),
    },
    {
      type: 'select',
      field: 'id_type_operation',
      label: 'Тип операции',
      // @ts-ignore
      relationKey: 'type_operation',
      getOptions: (data: any) =>
        data.map((type: any) => ({
          value: type.id_type_operation,
          label: type.name,
        })),
    },
    {
      type: 'date-range',
      field: 'date',
      label: 'Период',
    },
  ];

  return (
    <CrudTable<OperationCard, NormalizedOperationCard>
      tableName={OPERATION_CARD_TABLE_NAME}
      columns={OPERATION_CARD_COLUMNS}
      formColumns={OPERATION_CARD_FORM_COLUMNS}
      idField="id_operation_card"
      normalizeData={normalizeData}
      relations={{
        // @ts-ignore
        card: {
          tableName: CARD_TABLE_NAME,
          valueField: 'id_card',
          labelField: 'name',
        },
        // @ts-ignore
        type_operation: {
          tableName: 'type_operation',
          valueField: 'id_type_operation',
          labelField: 'name',
        },
      }}
      isSearchable
      formRelations={{
        id_card: {
          tableName: CARD_TABLE_NAME,
          valueField: 'id_card',
          labelField: 'number',
        },
        id_type_operation: {
          tableName: 'type_operation',
          valueField: 'id_type_operation',
          labelField: 'name',
        },
      }}
      searchableColumns={['card', 'type_operation', 'description']}
      filters={filters}
    />
  );
};
