export const CORRECTION_FORM_COLUMNS = {
  date: {
    type: 'DATE',
    nullable: true,
    label: 'Дата',
  },
  description: {
    type: 'TEXT',
    nullable: true,
    label: 'Описание',
    placeholder: 'Введите описание',
  },
  amount: {
    type: 'INTEGER',
    nullable: true,
    label: 'Сумма',
    placeholder: 'Введите сумму',
  },
  point_amount: {
    type: 'INTEGER',
    nullable: true,
    label: 'Баллы',
    placeholder: 'Введите количество баллов',
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
  id_card: {
    type: 'UUID',
    nullable: true,
    label: 'Карта',
    fieldType: 'select',
    relation: {
      table: 'card',
      value: 'id_card',
      label: 'name',
    },
  },
};
