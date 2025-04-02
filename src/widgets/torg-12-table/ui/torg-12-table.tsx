import {
  NormalizedTorg12,
  Torg12,
  TORG12_COLUMNS,
  TORG12_FILTERS,
  TORG12_FORM_COLUMNS,
  TORG12_TABLE_NAME,
} from '@/entities';
import { createTorg12QuickFilters } from '@/entities/torg12/model/quick-filters';
import { CrudTable } from '@/shared/ui';
import { TORG12_TABLE_FORM_RELATIONS, TORG12_TABLE_RELATIONS } from '../_constant';

export const Torg12Table = () => {
  const normalizeData = (
    torg12s: Torg12[],
    relations: {
      client: any[];
      balance: any[];
      card: any[];
      status: any[];
    }
  ): NormalizedTorg12[] => {
    return torg12s.map((torg12) => {
      const client = relations.client?.find((client) => client.id_client === torg12.id_client);
      const supplier = relations.balance?.find(
        (balance) => balance.id_balance === torg12.id_balance_supplier
      );
      const card = relations.card?.find((card) => card.id_card === torg12.id_card);
      const balance = relations.balance?.find(
        (balance) => balance.id_balance === torg12.id_balance
      );
      const status = relations.status?.find((status) => status.id_status === torg12.status);

      const purpose = balance ? `Баланс: ${balance.name}` : card ? `Карта: ${card.purpose}` : '';

      return {
        ...torg12,
        date: torg12.date || '',
        client_name: client?.name || '',
        cost: torg12.cost || 0,
        income: torg12.income || 0,
        expense: torg12.expense || 0,
        profit: torg12.profit || 0,
        supplier_name: supplier?.name || '',
        status: status?.name || '',
        purpose,
      };
    });
  };

  return (
    <CrudTable<Torg12, NormalizedTorg12>
      tableName={TORG12_TABLE_NAME}
      columns={TORG12_COLUMNS}
      formColumns={TORG12_FORM_COLUMNS}
      idField="id_torg12"
      normalizeData={normalizeData}
      // @ts-ignore
      relations={TORG12_TABLE_RELATIONS}
      formRelations={TORG12_TABLE_FORM_RELATIONS}
      modalSize="xl"
      searchableColumns={['client_name', 'supplier_name']}
      filters={TORG12_FILTERS}
      // @ts-ignore
      quickFilters={createTorg12QuickFilters}
      quickFilterRelation={{
        tableName: 'status',
        // @ts-ignore
        valueField: 'id_status',
        labelField: 'name',
      }}
    />
  );
};
