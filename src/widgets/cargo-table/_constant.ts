export const CARGO_TABLE_RELATIONS = {
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
  city: {
    tableName: 'city',
    valueField: 'id_city',
    labelField: 'name',
  },
  carrier: {
    tableName: 'carrier',
    valueField: 'id_carrier',
    labelField: 'name',
  },
  pay_target: {
    tableName: 'pay_target',
    valueField: 'id_pay_target',
    labelField: 'name',
  },
};

export const CARGO_TABLE_FORM_RELATIONS = {
  id_client: {
    tableName: 'client',
    valueField: 'id_client',
    labelField: 'name',
  },
  id_employee: {
    tableName: 'employee',
    valueField: 'id_employee',
    labelField: 'last_name',
  },
  id_city_loading: {
    tableName: 'city',
    valueField: 'id_city',
    labelField: 'name',
  },
  id_city_unloading: {
    tableName: 'city',
    valueField: 'id_city',
    labelField: 'name',
  },
  id_carrier: {
    tableName: 'carrier',
    valueField: 'id_carrier',
    labelField: 'name',
  },
  id_pay_target: {
    tableName: 'pay_target',
    valueField: 'id_pay_target',
    labelField: 'name',
  },
};
