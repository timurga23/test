export const TORG12_TABLE_RELATIONS = {
  client: {
    tableName: 'client',
    valueField: 'id_client',
    labelField: 'name',
  },
  balance: {
    tableName: 'balance',
    valueField: 'id_balance',
    labelField: 'name',
  },
  card: {
    tableName: 'card',
    valueField: 'id_card',
    labelField: 'purpose',
  },
  status: {
    tableName: 'status',
    valueField: 'id_status',
    labelField: 'name',
  },
};

export const TORG12_TABLE_FORM_RELATIONS = {
  id_client: {
    tableName: 'client',
    valueField: 'id_client',
    labelField: 'name',
  },
  id_balance_supplier: {
    tableName: 'balance',
    valueField: 'id_balance',
    labelField: 'name',
  },
  id_card: {
    tableName: 'card',
    valueField: 'id_card',
    labelField: 'purpose',
  },
  status: {
    tableName: 'status',
    valueField: 'id_status',
    labelField: 'name',
  },
};
