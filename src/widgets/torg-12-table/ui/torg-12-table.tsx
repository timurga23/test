import {
  NormalizedTorg12,
  Torg12,
  TORG12_COLUMNS,
  TORG12_FILTERS,
  TORG12_FORM_COLUMNS,
  TORG12_TABLE_NAME,
} from '@/entities';
import { createTorg12QuickFilters } from '@/entities/torg12/model/quick-filters';
import { formatAmount } from '@/shared/lib/helpers/formatAmount';
import { CrudTable } from '@/shared/ui';
import {
  Text
} from '@mantine/core';
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
      const status = relations.status?.find((status) => status.numb_status === torg12.status);

      const purpose = balance ? `Баланс: ${balance.name}` : card?.name ? `Карта: ${card.name}` : '';

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
        numb_status: torg12.status || '',
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
      additionalBlock={(calculatedData) => {
        const {profit, objBalance} = calculatedData;
        const oleg = Object.values(objBalance)[0];
        
        return (
            <Text>Олег: {formatAmount(oleg)} Прибыль: {formatAmount(profit)}</Text>
        );
      }}
      calculateData={(data, filterValues) => {
        let profit = 0;
        let objBalance = {};
        
        // Используем первый день текущего месяца, как в старом коде
        const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
        
        const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        sortedData.forEach(item => {
          if (item.numb_status > 1) {
            if (item.id_balance) {
              if (!objBalance[item.id_balance]) {
                objBalance[item.id_balance] = 0;
              }
              objBalance[item.id_balance] += item.income;
            }
            if (!objBalance[item.id_balance_supplier]) {
              objBalance[item.id_balance_supplier] = 0;
            }
            objBalance[item.id_balance_supplier] -= item.expense;
            
            const itemDate = new Date(item.date).getTime();
            // Изменяем условие, чтобы оно точно соответствовало старому коду
            if (firstDay < itemDate && item.numb_status !== 5) {
              profit += item.profit;
            }
          }
        });

        return { data, profit, objBalance };
      }}
    />
  );
};
