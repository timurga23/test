import { CARRIER_ID_FIELD, CARRIER_TABLE_NAME } from '@/entities/carrier/model/_constant';
import { CARRIER_COLUMNS } from '@/entities/carrier/model/columns';
import { Carrier, NormalizedCarrier } from '@/entities/carrier/model/types';
import { PayTarget } from '@/entities/pay-target';
import { NormalizedPayTarget } from '@/entities/pay-target/model/types';
import { CrudTable } from '@/shared/ui';

const ID_PAY_TARGET_MSK = '770142b9-9c5b-4e74-8f4f-d25cbdd02f71';

export const CarrierTable = () => {
  const normalizeData = (
    carriers: Carrier[],
    relations,
  ): NormalizedCarrier[] => {
    const objDuty = {
      Ekat: 0,
      Msc: 0,
    };

    relations?.cargo?.forEach((cargo) => {
      if (cargo.numb_carrier === 2) {
        objDuty['Ekat'] += cargo.price / Math.pow(10, cargo.point_price);
      } else if (cargo.numb_carrier === 3) {
        objDuty['Msc'] += cargo.rate * cargo.price / Math.pow(10, cargo.point_price + cargo.point_rate) + cargo.outgo / Math.pow(10, cargo.point_outgo);
      }
      if (cargo.id_pay_target === ID_PAY_TARGET_MSK) {
        objDuty['Msc'] -= cargo.rate * cargo.price_client / Math.pow(10, cargo.point_price_client + cargo.point_rate);
      }
    });

    relations?.correction?.forEach((correction) => {
      if (correction.id_pay_target === '2a0c0aa1-024d-4c5a-b809-b1e248a6d943') {
        objDuty['Ekat'] -= correction.amount / Math.pow(10, correction.point_amount);
      } else if (correction.id_pay_target === ID_PAY_TARGET_MSK) {
        objDuty['Msc'] -= correction.amount / Math.pow(10, correction.point_amount);
      }
    });

    return Object.entries(objDuty).map(([key, value]) => ({ name: key, balance: value }));
  };

  return (
    <CrudTable<PayTarget, NormalizedPayTarget>
      tableName={CARRIER_TABLE_NAME}
      columns={CARRIER_COLUMNS}
      idField={CARRIER_ID_FIELD}
      normalizeData={normalizeData}
      // @ts-ignore
      relations={{
       // @ts-ignore
      cargo: {
        tableName: 'cargo',
        valueField: 'id_cargo',
        labelField: 'name',
      },
       // @ts-ignore
      correction: {
        tableName: 'correction',
        valueField: 'id_correction',
        labelField: 'description',
      },
      }}
      isSearchable={false}
      isEditable={false}
    />
  );
};
