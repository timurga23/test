export const OPERATION_SAFE_FORM_COLUMNS = {
  date: {
    type: 'DATE',
    nullable: true,
    label: 'Дата',
  },
  id_type_operation: {
    type: 'UUID',
    nullable: true,
    label: 'Тип операции',
    fieldType: 'select',
    relation: {
      table: 'type_operation',
      value: 'id_type_operation',
      label: 'name',
    },
  },
  summ: {
    type: 'INTEGER',
    nullable: true,
    label: 'Сумма',
    placeholder: 'Введите сумму',
  },
  id_direction_safe: {
    type: 'UUID',
    nullable: true,
    label: 'Связь',
    fieldType: 'select',
    relation: {
      table: 'direction_safe',
      value: 'id_direction_safe',
      label: 'name',
    },
  },
  description: {
    type: 'TEXT',
    nullable: true,
    label: 'Примечание',
    placeholder: 'Введите примечание',
  },
};
