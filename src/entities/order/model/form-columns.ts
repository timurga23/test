export const ORDER_FORM_COLUMNS = {
  date: {
    type: 'DATE',
    nullable: true,
    label: 'Дата',
  },
  id_status: {
    type: 'UUID',
    nullable: true,
    label: 'Статус',
    fieldType: 'select',
    relation: {
      table: 'status',
      value: 'id_status',
      label: 'name',
    },
  },
  id_client: {
    type: 'UUID',
    nullable: false,
    label: 'Клиент',
    fieldType: 'select',
    relation: {
      table: 'client',
      value: 'id_client',
      label: 'name',
    },
  },
  positions: {
    type: 'UUID',
    nullable: true,
    label: 'Позиции заказа',
    fieldType: 'positions',
    relation: {
      table: 'positions_order',
      through: {
        table: 'positions_order',
        foreignKey: 'id_position',
        relationKey: 'id_order',
      },
    },
  },
};
