export const OPERATION_SAFE_TABLE_RELATIONS = {
  direction_safe: {
    tableName: 'direction_safe',
    valueField: 'id_direction_safe',
    labelField: 'name',
  },
  card: {
    tableName: 'card',
    valueField: 'id_card',
    labelField: 'number',
  },
  type_operation: {
    tableName: 'type_operation',
    valueField: 'id_type_operation',
    labelField: 'name',
  },
  operation_card: {
    tableName: 'operation_card',
    valueField: 'id_operation_card',
    labelField: 'number',
  },
};

export const OPERATION_SAFE_TABLE_FORM_RELATIONS = {
  id_direction_safe: {
    tableName: 'direction_safe',
    valueField: 'id_direction_safe',
    labelField: 'name',
  },
  id_card: {
    tableName: 'card',
    valueField: 'id_card',
    labelField: 'number',
  },
  id_type_operation: {
    tableName: 'type_operation',
    valueField: 'id_type_operation',
    labelField: 'name',
  },
  id_operation_card: {
    tableName: 'operation_card',
    valueField: 'id_operation_card',
    labelField: 'number',
  },
};

export const OPERATION_SAFE_TABLE_FILTERS = [
  {
    type: 'select',
    field: 'id_direction_safe',
    label: 'Источник',
    relationKey: 'direction_safe',
    searchField: 'direction_safe',
    // @ts-ignore
    getOptions: (data) =>
      data?.map((item: any) => ({
        value: item.id_direction_safe,
        label: item.name,
      })) || [],
  },
  {
    type: 'select',
    field: 'id_type_operation',
    label: 'Тип операции',
    relationKey: 'type_operation',
    searchField: 'type_operation',
    // @ts-ignore
    getOptions: (data) =>
      data?.map((item: any) => ({
        value: item.id_type_operation,
        label: item.name,
      })) || [],
  },
  {
    type: 'date-range',
    field: 'date',
    label: 'Дата',
  },
];

export const OPERATION_SAFE_TABLE_QUICK_FILTER_RELATION = {
  tableName: 'type_operation',
  valueField: 'id_type_operation',
  labelField: 'name',
};
