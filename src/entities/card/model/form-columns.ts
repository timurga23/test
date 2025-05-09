export const CARD_FORM_COLUMNS = {
  name: {
    type: 'TEXT',
    nullable: true,
    label: 'Наименование',
    placeholder: 'Введите наименование',
  },
  fio: { type: 'TEXT', nullable: true, label: 'Держатель', placeholder: 'Введите ФИО держателя' },
  number: {
    type: 'TEXT',
    nullable: true,
    label: 'Номер карты',
    placeholder: 'Введите номер карты',
  },
  id_bank: {
    type: 'UUID',
    nullable: true,
    label: 'Банк',
    fieldType: 'select',
    placeholder: 'Выберите банк',
    relation: {
      table: 'bank',
      value: 'id_bank',
      label: 'name',
    },
  },
  id_employee: {
    type: 'UUID',
    nullable: true,
    label: 'Ответственный',
    fieldType: 'select',
    placeholder: 'Выберите ответственного',
    relation: {
      table: 'employee',
      value: 'id_employee',
      label: 'name',
    },
  },
  card_limit: { type: 'INTEGER', nullable: true, label: 'Лимит', placeholder: 'Введите лимит' },
  blocking: {
    type: 'BOOLEAN',
    nullable: true,
    defaultValue: false,
    label: 'Активность',
    fieldType: 'switch',
  },
  description: { type: 'TEXT', nullable: true, label: 'Описание', placeholder: 'Введите описание' },
};
