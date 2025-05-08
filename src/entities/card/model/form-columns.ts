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
    type: 'TEXT',
    nullable: true,
    label: 'Банк',
    fieldType: 'select',
    placeholder: 'Выберите банк',
  },
  id_employee: {
    type: 'TEXT',
    nullable: true,
    label: 'Ответственный',
    fieldType: 'select',
    placeholder: 'Выберите ответственного',
  },
  limit_amount: { type: 'INTEGER', nullable: true, label: 'Лимит', placeholder: 'Введите лимит' },
  blocking: {
    type: 'BOOLEAN',
    nullable: true,
    defaultValue: false,
    label: 'Активность',
    fieldType: 'switch',
  },
  description: { type: 'TEXT', nullable: true, label: 'Описание', placeholder: 'Введите описание' },
};
