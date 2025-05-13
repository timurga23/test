export const EMPLOYEE_FORM_COLUMNS = {
  last_name: {
    type: 'TEXT',
    nullable: true,
    label: 'Фамилия',
  },
  first_name: {
    type: 'TEXT',
    nullable: true,
    label: 'Имя',
  },
  middle_name: {
    type: 'TEXT',
    nullable: true,
    label: 'Отчество',
  },
  birth_date: { 
    type: 'DATE',
    nullable: true,
    label: 'Дата рождения',
  },
  phone: {
    type: 'TEXT',
    nullable: true,
    label: 'Телефон',
  },
  login: {
    type: 'TEXT',
    nullable: false,
    label: 'Логин',
  },
  password: {
    type: 'TEXT',
    nullable: true,
    label: 'Пароль',
    fieldType: 'password',
  },
  relevance: {
    type: 'BOOLEAN',
    nullable: true,
    defaultValue: false,
    label: 'Активен',
  },
  id_employee_replacement: {
    type: 'UUID',
    nullable: true,
    label: 'Замещающий сотрудник',
    fieldType: 'select',
    relation: {
      table: 'employee',
      value: 'id_employee',
      label: 'name',
    },
  },
  positions: {
    type: 'UUID', 
    nullable: true,
    label: 'Должности',
    fieldType: 'multiselect',
    relation: {
      table: 'position',
      value: 'id_position',
      label: 'name',
      through: {
        table: 'employee_positions',
        foreignKey: 'id_position',
        relationKey: 'id_employee',
      },
    },
  },
}; 