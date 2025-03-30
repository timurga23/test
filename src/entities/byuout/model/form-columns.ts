export const BUYOUT_FORM_COLUMNS = {
  id_client: {
    type: 'UUID',
    nullable: true,
    label: 'Клиент',
    fieldType: 'select',
    relation: {
      table: 'client',
      value: 'id_client',
      label: 'name',
    },
  },
  // id_employee: {
  //   type: 'UUID',
  //   nullable: true,
  //   label: 'Снабженец',
  //   fieldType: 'select',
  //   relation: {
  //     table: 'employee',
  //     value: 'id_employee',
  //     label: 'name',
  //   },
  // },
  date: {
    type: 'DATE',
    nullable: true,
    label: 'Дата оплаты',
  },
  agent: {
    type: 'BOOLEAN',
    nullable: true,
    label: 'Агент',
    fieldType: 'checkbox',
  },
  id_pay_target: {
    type: 'UUID',
    nullable: true,
    label: 'Цель оплаты',
    fieldType: 'select',
    relation: {
      table: 'pay_target',
      value: 'id_pay_target',
      label: 'name',
    },
  },
};
