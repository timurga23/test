import { PAY_TARGET_TABLE_NAME, PayTarget } from '@/entities/pay-target';
import { PAY_TARGET_COLUMNS } from '@/entities/pay-target/model/columns';
import { NormalizedPayTarget } from '@/entities/pay-target/model/types';
import { CrudTable } from '@/shared/ui';

export const PayTargetTable = () => {
  const normalizeData = (
    payTargets: PayTarget[],
    relations,
  ): NormalizedPayTarget[] => {
    return payTargets.filter((payTarget) => !!payTarget.relevance).map((payTarget) => {
      let balance = 0;

      relations?.cargo?.forEach((cargo) => {
        if (cargo.id_pay_target === payTarget.id_pay_target) {
          balance += cargo.price_client * cargo.rate / Math.pow(10, cargo.point_price_client + cargo.point_rate);
        }
      });

      relations?.correction?.forEach((correction) => {
        if (correction.id_pay_target === payTarget.id_pay_target) {
          balance += correction.amount / Math.pow(10, correction.point_amount);
        }
      });

      relations?.buyout?.forEach((buyout) => {
        if (buyout.id_pay_target === payTarget.id_pay_target) {
          balance += buyout.price_client / Math.pow(10, buyout.point_price_client);
        }
      });

      return {
        ...payTarget,
        balance,
      };
    });
  };

  return (
    <CrudTable<PayTarget, NormalizedPayTarget>
      tableName={PAY_TARGET_TABLE_NAME}
      columns={PAY_TARGET_COLUMNS}
      idField="id_pay_target"
      normalizeData={normalizeData}
      // @ts-ignore
      relations={{
         // @ts-ignore
      pay_target: {
        tableName: 'pay_target',
        valueField: 'id_pay_target',
        labelField: 'name',
      },
       // @ts-ignore
      correction: {
        tableName: 'correction',
        valueField: 'id_correction',
        labelField: 'description',
      },
       // @ts-ignore
      cargo: {
        tableName: 'cargo',
        valueField: 'id_cargo',
        labelField: 'name',
      },
      }}
      isEditable={false}
    />
  );
};
