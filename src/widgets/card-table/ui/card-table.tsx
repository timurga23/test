import { Card, CARD_COLUMNS, CARD_TABLE_NAME } from '@/entities/card';
import { CARD_FORM_COLUMNS } from '@/entities/card/model/form-columns';
import { CrudTable } from '@/shared/ui';
import { NormalizedCard } from '../model/types';

const normalizeData = (
  cards: Card[],
  relations: {
    bank: any[];
    employee: any[];
  }
): NormalizedCard[] => {

  return cards.map((card) => {
    const bank = relations.bank?.find((bank) => bank.id_bank === card.id_bank);
    const employee = relations.employee?.find(
      (emp) => emp.id_employee === card.id_employee
    );


    return {
      ...card,
      bank: bank?.name || '',
      employee: employee
        ? `${employee.last_name} ${employee.first_name}`
        : '',
    };
  });
};

export const CardTable = () => {
  return (
   <CrudTable<Card>
      normalizeData={normalizeData}
        tableName={CARD_TABLE_NAME}
        columns={CARD_COLUMNS}
        formColumns={CARD_FORM_COLUMNS}
        idField={'id_card'}
        formRelations={{
          // @ts-ignore
          id_bank: {
            tableName: 'bank',
            valueField: 'id_bank',
            labelField: 'name'
          },
          id_employee: {
            tableName: 'employee',
            valueField: 'id_employee',
            labelField: 'last_name'
          }
        }}
        relations={{
          // @ts-ignore
          bank: {
            tableName: 'bank',
            foreignKey: 'id_bank',
            displayField: 'name'
          },
          // @ts-ignore
          employee: {
            tableName: 'employee',
            foreignKey: 'id_employee',
            displayField: 'name'
          }
        }}
      />
  );
};
