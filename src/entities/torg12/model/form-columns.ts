export const TORG12_FORM_COLUMNS = {
  date: {
    type: 'DATE',
    nullable: true,
    label: 'Дата',
  },
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
  cost: {
    type: 'INTEGER',
    nullable: true,
    label: 'Сумма',
  },
  income: {
    type: 'INTEGER',
    nullable: true,
    label: 'Приход',
    disabled: true,
  },
  expense: {
    type: 'INTEGER',
    nullable: true,
    label: 'Расход',
    disabled: true,
  },
  profit: {
    type: 'INTEGER',
    nullable: true,
    label: 'Прибыль',
    disabled: true,
  },
  id_balance_supplier: {
    type: 'UUID',
    nullable: true,
    label: 'Поставщик',
    fieldType: 'select',
    relation: {
      table: 'balance',
      value: 'id_balance',
      label: 'name',
    },
  },
  fee_supplier: {
    type: 'INTEGER',
    nullable: true,
    label: 'Комиссия поставщика',
  },
  status: {
    type: 'TEXT',
    nullable: true,
    label: 'Статус',
  }, // todo: сделать статусы в виде select
  id_card: {
    type: 'UUID',
    nullable: true,
    label: 'Назначение',
    fieldType: 'select',
    relation: {
      table: ['card', 'balance'], // Теперь указываем массив таблиц
      value: 'id_card',
      label: 'name',
      prefix: 'Карта:',
      // Добавляем связанное поле
      linkedField: {
        prefix: 'Баланс:',
        table: 'balance',
        value: 'id_balance',
        label: 'name',
        mapping: 'id_balance' // Поле из таблицы balance, которое нужно использовать
      }
    },
  },
  id_balance: {
    type: 'UUID',
    nullable: true,
    label: 'баланс',
    fieldType: 'select',
    hidden: true, 
    relation: {
      table: 'balance',
      value: 'id_balance',
      label: 'name',
    },
  },
};
