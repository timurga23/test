import {
  NormalizedOrder,
  ORDER_COLUMNS,
  ORDER_FORM_COLUMNS,
  ORDER_TABLE_NAME,
  Order,
} from '@/entities/order';
import { CrudTable } from '@/shared/ui';

export const OrderTable = () => {
  const normalizeData = (
    orders: Order[],
    relations: {
      client: any[];
      status: any[];
      positions_order: any[];
    }
  ): NormalizedOrder[] => {
    //@ts-ignore
    return orders.map((order) => {
      const client = relations.client?.find((client) => client.id_client === order.id_client);

      const status = relations.status?.find((status) => status.id_status === order.id_status);

      // Подсчитываем количество позиций для заказа
      const positions = relations.positions_order?.filter(
        (position) => position.id_order === order.id_order
      );

      // todo выяснить как считать сумму заказа у Эмиля
      return {
        ...order,
        client_name: client?.name || '',
        status_name: status?.name || '',
        position: positions?.length,
        positions,
      };
    });
  };

  return (
    <CrudTable<Order, NormalizedOrder>
      tableName={ORDER_TABLE_NAME}
      columns={ORDER_COLUMNS}
      formColumns={ORDER_FORM_COLUMNS}
      idField="id_order"
      normalizeData={normalizeData}
      relations={{
        // @ts-ignore
        client: {
          tableName: 'client',
          valueField: 'id_client',
          labelField: 'name',
        },
        // @ts-ignore
        status: {
          tableName: 'status',
          valueField: 'id_status',
          labelField: 'name',
        },
        // @ts-ignore
        positions_order: {
          tableName: 'positions_order',
          valueField: 'id_order',
          labelField: 'id_order',
        },
      }}
      formRelations={{
        id_client: {
          tableName: 'client',
          valueField: 'id_client',
          labelField: 'name',
        },
        id_status: {
          tableName: 'status',
          valueField: 'id_status',
          labelField: 'name',
        },
      }}
      modalSize="xxl"
      searchableColumns={['number', 'client_name', 'status_name']}
    />
  );
};
