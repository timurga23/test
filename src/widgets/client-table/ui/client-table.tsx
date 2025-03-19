import { CLIENT_COLUMNS, CLIENT_FORM_COLUMNS, CLIENT_TABLE_NAME, Client } from '@/entities/client';
import { CrudTable, Filter } from '@/shared/ui';

interface NormalizedClient extends Client {
  city: string;
  services: Array<{
    id_service: string;
    name: string;
  }>;
}

export const ClientTable = () => {
  const normalizeData = (
    clients: Client[],
    relations: { client_citys: any[]; city: any[]; client_services: any[]; service: any[] }
  ): NormalizedClient[] => {
    return clients.map((client) => {
      const clientCity = relations.client_citys?.find(
        (relation) => relation.id_client === client.id_client
      );
      const city = relations.city?.find((city) => city.id_city === clientCity?.id_city);

      const clientServices =
        relations.client_services?.filter((cs) => cs.id_client === client.id_client) || [];

      const services = clientServices.map((cs) => {
        const service = relations.service?.find((s) => s.id_service === cs.id_service);
        return {
          id_service: cs.id_service,
          name: service?.name || '',
        };
      });

      return {
        ...client,
        city: city?.name || '',
        services,
      };
    });
  };

  const filters: Filter[] = [
    {
      type: 'select',
      field: 'services',
      label: 'Услуга',
      relationKey: 'service',
      searchField: 'id_service',
      getOptions: (data) =>
        data.map((item: any) => ({
          value: item.id_service,
          label: item.name,
        })),
    },
  ];

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
        // @ts-ignore
        client_services: {
          tableName: 'client_services',
          valueField: 'id_service',
          labelField: 'id_service',
        },
        // @ts-ignore
        service: {
          tableName: 'service',
          valueField: 'id_service',
          labelField: 'name',
        },
      }}
      formRelations={{
        services: {
          tableName: 'service',
          valueField: 'id_service',
          labelField: 'name',
        },
        city: {
          tableName: 'city',
          valueField: 'id_city',
          labelField: 'name',
        },
      }}
      searchableColumns={['name', 'city']}
      filters={filters}
    />
  );
};
