export const OPERATION_CARD_FORM_COLUMNS = {
  id_card: {
    type: 'UUID',
    nullable: false,
    label: 'Карта',
    fieldType: 'select',
    relation: {
      table: 'card',
      value: 'id_card',
      label: 'number',
    },
  },
  id_type_operation: {
    type: 'UUID',
    nullable: false,
    label: 'Тип операции',
    fieldType: 'select',
    relation: {
      table: 'type_operation',
      value: 'id_type_operation',
      label: 'name',
    },
  },
  date: {
    type: 'DATE',
    label: 'Дата',
    fieldType: 'date',
  },
  summ: {
    type: 'INTEGER',
    label: 'Сумма',
    fieldType: 'number',
  },
  point_summ: {
    type: 'INTEGER',
    label: 'Баллы',
    fieldType: 'number',
  },
  description: {
    type: 'TEXT',
    label: 'Описание',
  },
};
