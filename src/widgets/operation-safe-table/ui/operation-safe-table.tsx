import {
  NormalizedOperationSafe,
  OPERATION_SAFE_COLUMNS,
  OPERATION_SAFE_FORM_COLUMNS,
  OperationSafe,
} from '@/entities/operation_safe';
import { CrudTable } from '@/shared/ui';
import {
  OPERATION_SAFE_TABLE_FILTERS,
  OPERATION_SAFE_TABLE_FORM_RELATIONS,
  OPERATION_SAFE_TABLE_QUICK_FILTER_RELATION,
  OPERATION_SAFE_TABLE_RELATIONS,
} from '../_constant';

// Создаем фабрику для быстрых фильтров на основе данных из таблицы
const createOperationSafeQuickFilters = (typeOperationData: any[]) => {
  return [
    {
      id: 'all',
      label: 'Все',
      field: 'type_operation_name',
      value: null,
    },
    // Создаем фильтры из данных таблицы типов операций
    ...typeOperationData.map((type) => ({
      id: type.id_type_operation,
      label: type.name,
      field: 'type_operation_name',
      value: type.id_type_operation,
    })),
  ];
};

export const OperationSafeTable = () => {
  const normalizeData = (
    operationSafes: OperationSafe[],
    relations: {
      direction_safe: any[];
      card: any[];
      type_operation: any[];
      operation_card: any[];
    }
  ): NormalizedOperationSafe[] => {
    return operationSafes.map((operationSafe) => {
      const directionSafe = relations.direction_safe?.find(
        (direction) => direction.id_direction_safe === operationSafe.id_direction_safe
      );

      const card = relations.card?.find((card) => card.id_card === operationSafe.id_card);

      const typeOperation = relations.type_operation?.find(
        (type) => type.id_type_operation === operationSafe.id_type_operation
      );

      const operationCard = relations.operation_card?.find(
        (card) => card.id_operation_card === operationSafe.id_operation_card
      );

      return {
        ...operationSafe,
        direction_safe_name: directionSafe?.name || '',
        card_number: card?.number || '',
        type_operation_name: typeOperation?.name || '',
        operation_card_number: operationCard?.number || '',
      };
    });
  };

  return (
    <CrudTable<OperationSafe, NormalizedOperationSafe>
      tableName="operation_safe"
      columns={OPERATION_SAFE_COLUMNS}
      formColumns={OPERATION_SAFE_FORM_COLUMNS}
      idField="id_operation_safe"
      normalizeData={normalizeData}
      modalSize="md"
      searchableColumns={['description', 'direction_safe_name']}
      // @ts-ignore
      relations={OPERATION_SAFE_TABLE_RELATIONS}
      // @ts-ignore
      formRelations={OPERATION_SAFE_TABLE_FORM_RELATIONS}
      // @ts-ignore
      filters={OPERATION_SAFE_TABLE_FILTERS}
      // @ts-ignore
      quickFilters={createOperationSafeQuickFilters}
      // @ts-ignore
      quickFilterRelation={OPERATION_SAFE_TABLE_QUICK_FILTER_RELATION}
    />
  );
};
