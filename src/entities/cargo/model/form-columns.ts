export const CARGO_FORM_COLUMNS = {
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
  id_employee: {
    type: 'UUID',
    nullable: true,
    label: 'Снабженец',
    fieldType: 'select',
    relation: {
      table: 'employee',
      value: 'id_employee',
      label: 'name',
    },
  },
  number_cargo: {
    type: 'TEXT',
    nullable: true,
    label: 'Номер груза',
    placeholder: 'Введите номер груза',
  },
  name: {
    type: 'TEXT',
    nullable: true,
    label: 'Груз',
    placeholder: 'Введите название груза',
  },
  date_pay: {
    type: 'DATE',
    nullable: true,
    label: 'Дата оплаты',
  },
  date_loading: {
    type: 'DATE',
    nullable: true,
    label: 'Дата загрузки',
  },
  id_city_loading: {
    type: 'UUID',
    nullable: true,
    label: 'Город загрузки',
    fieldType: 'select',
    relation: {
      table: 'city',
      value: 'id_city',
      label: 'name',
    },
  },
  date_delivery: {
    type: 'DATE',
    nullable: true,
    label: 'Приход (план)',
  },
  date_delivery_fact: {
    type: 'DATE',
    nullable: true,
    label: 'Приход (факт)',
  },
  id_city_unloading: {
    type: 'UUID',
    nullable: true,
    label: 'Город выгрузки',
    fieldType: 'select',
    relation: {
      table: 'city',
      value: 'id_city',
      label: 'name',
    },
  },
  id_carrier: {
    type: 'UUID',
    nullable: true,
    label: 'Перевозчик',
    fieldType: 'select',
    relation: {
      table: 'carrier',
      value: 'id_carrier',
      label: 'name',
    },
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
  delivery: {
    type: 'CUSTOM',
    fieldType: 'delivery-block',
    label: '',
  },
};
