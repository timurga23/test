export const CORRECTION_TABLE_RELATIONS = {
  pay_target: {
    tableName: 'pay_target',
    valueField: 'id_pay_target',
    labelField: 'name',
  },
  card: {
    tableName: 'card',
    valueField: 'id_card',
    labelField: 'number',
  },
  operation_card: {
    tableName: 'operation_card',
    valueField: 'id_operation_card',
    labelField: 'number',
  },
};

export const CORRECTION_TABLE_FORM_RELATIONS = {
  id_pay_target: {
    tableName: 'pay_target',
    valueField: 'id_pay_target',
    labelField: 'name',
  },
  id_card: {
    tableName: 'card',
    valueField: 'id_card',
    labelField: 'number',
  },
  id_operation_card: {
    tableName: 'operation_card',
    valueField: 'id_operation_card',
    labelField: 'number',
  },
};
