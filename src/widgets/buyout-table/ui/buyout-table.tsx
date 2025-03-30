import {
  Buyout,
  BUYOUT_COLUMNS,
  BUYOUT_FORM_COLUMNS,
  BUYOUT_TABLE_NAME,
  NormalizedBuyout,
} from '@/entities';
import { CrudTable } from '@/shared/ui';
import { BUYOUT_TABLE_FORM_RELATIONS, BUYOUT_TABLE_RELATIONS } from '../_constant';

export const BuyoutTable = () => {
  const normalizeData = (
    buyouts: Buyout[],
    relations: {
      client: any[];
      employee: any[];
      pay_target: any[];
    }
  ): NormalizedBuyout[] => {
    return buyouts.map((buyout) => {
      const client = relations.client?.find((client) => client.id_client === buyout.id_client);
      const employee = relations.employee?.find(
        (employee) => employee.id_employee === buyout.id_employee
      );
      const payTarget = relations.pay_target?.find(
        (target) => target.id_pay_target === buyout.id_pay_target
      );

      return {
        ...buyout,
        employee,
        date_pay: buyout.date || '',
        client_name: client?.name || '',
        rate: buyout.rate || 0,
        rate_client: buyout.rate_client || 0,
        price: buyout.price || 0,
        price_client: buyout.price_client || 0,
        delta: Number(buyout.price_client || 0) - Number(buyout.price || 0),
        pay_target_name: payTarget?.name || '',
      };
    });
  };

  return (
    <CrudTable<Buyout, NormalizedBuyout>
      tableName={BUYOUT_TABLE_NAME}
      columns={BUYOUT_COLUMNS}
      formColumns={BUYOUT_FORM_COLUMNS}
      idField="id_buyout"
      normalizeData={normalizeData}
      // @ts-ignore
      relations={BUYOUT_TABLE_RELATIONS}
      formRelations={BUYOUT_TABLE_FORM_RELATIONS}
      modalSize="xl"
      searchableColumns={['client_name', 'pay_target_name']}
    />
  );
};
