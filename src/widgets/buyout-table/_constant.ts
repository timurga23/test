export const BUYOUT_TABLE_RELATIONS = {
  client: {
    tableName: 'client',
    valueField: 'id_client',
    labelField: 'name',
  },
  employee: {
    tableName: 'employee',
    valueField: 'id_employee',
    labelField: 'name',
  },
  pay_target: {
    tableName: 'pay_target',
    valueField: 'id_pay_target',
    labelField: 'name',
  },
};

export const BUYOUT_TABLE_FORM_RELATIONS = {
  id_client: {
    tableName: 'client',
    valueField: 'id_client',
    labelField: 'name',
  },
  id_employee: {
    tableName: 'employee',
    valueField: 'id_employee',
    labelField: 'name',
  },
  id_pay_target: {
    tableName: 'pay_target',
    valueField: 'id_pay_target',
    labelField: 'name',
  },
};
