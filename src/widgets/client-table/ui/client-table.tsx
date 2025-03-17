import { CLIENT_COLUMNS, CLIENT_FORM_COLUMNS, CLIENT_TABLE_NAME, Client } from '@/entities/client';
import { CrudTable } from '@/shared/ui';

interface NormalizedClient extends Client {
  city: string;
}

export const ClientTable = () => {
  const normalizeData = (
    clients: Client[],
    relations: { client_citys: any[]; city: any[] }
  ): NormalizedClient[] => {
    return clients.map((client) => {
      const clientCity = relations.client_citys?.find(
        (relation) => relation.id_client === client.id_client
      );
      const city = relations.city?.find((city) => city.id_city === clientCity?.id_city);

      return {
        ...client,
        city: city?.name || '',
      };
    });
  };

  return (
    <CrudTable<Client, NormalizedClient>
      tableName={CLIENT_TABLE_NAME}
      columns={CLIENT_COLUMNS}
      formColumns={CLIENT_FORM_COLUMNS}
      idField="id_client"
      normalizeData={normalizeData}
      relations={{
        // @ts-ignore
        client_citys: {
          tableName: 'client_citys',
          valueField: 'id_city',
          labelField: 'id_city',
        },
        // @ts-ignore
        city: {
          tableName: 'city',
          valueField: 'id_city',
          labelField: 'name',
        },
      }}
      searchableColumns={['name', 'city']}
    />
  );
};
