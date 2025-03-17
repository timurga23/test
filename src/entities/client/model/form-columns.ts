export const CLIENT_FORM_COLUMNS = {
  organization: {
    type: 'TEXT',
    nullable: true,
    label: 'Организация',
    placeholder: 'Введите название организации',
  },
  name: {
    type: 'TEXT',
    nullable: true,
    label: 'Наименование',
    placeholder: 'Введите наименование',
  },
  phone_number: {
    type: 'TEXT',
    nullable: true,
    label: 'Телефон',
    placeholder: 'Введите номер телефона',
  },
  email: {
    type: 'TEXT',
    nullable: true,
    label: 'Email',
    placeholder: 'Введите email',
  },
  link_table: {
    type: 'TEXT',
    nullable: true,
    label: 'Ссылка',
    placeholder: 'Введите ссылку',
  },
  bitrix: {
    type: 'TEXT',
    nullable: true,
    label: 'Bitrix',
    placeholder: 'Введите bitrix',
  },
  address: {
    type: 'TEXT',
    nullable: true,
    label: 'Адрес',
    placeholder: 'Введите адрес',
  },
  passport: {
    type: 'TEXT',
    nullable: true,
    label: 'Паспорт',
    placeholder: 'Введите паспортные данные',
  },
  relevance: {
    type: 'BOOLEAN',
    nullable: true,
    defaultValue: 'true',
    label: 'Актуальность',
    fieldType: 'switch',
  },
  login: {
    type: 'TEXT',
    nullable: true,
    label: 'Логин',
    placeholder: 'Введите логин',
  },
  password: {
    type: 'TEXT',
    nullable: true,
    label: 'Пароль',
    placeholder: 'Введите пароль',
  },
};
