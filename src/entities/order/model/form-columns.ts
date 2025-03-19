export const CLIENT_FORM_COLUMNS = {
  name: {
    type: 'TEXT',
    nullable: true,
    label: 'Имя',
    placeholder: 'Введите имя',
  },
  organization: {
    type: 'TEXT',
    nullable: true,
    label: 'Организация',
    placeholder: 'Введите название организации',
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
  link_table: {
    type: 'TEXT',
    nullable: true,
    label: 'Таблица',
    placeholder: 'Введите ссылку',
  },
  bitrix: {
    type: 'TEXT',
    nullable: true,
    label: 'Bitrix',
    placeholder: 'Введите bitrix',
  },
  relevance: {
    type: 'BOOLEAN',
    nullable: true,
    defaultValue: 'true',
    label: 'Актуальность',
    fieldType: 'switch',
  },
};
