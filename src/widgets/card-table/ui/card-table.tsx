import { Card, CARD_COLUMNS, CARD_TABLE_NAME } from '@/entities/card';
import { CARD_FORM_COLUMNS } from '@/entities/card/model/form-columns';
import { CrudTable } from '@/shared/ui';
import { formatAmount } from '../../../shared/lib/helpers/formatAmount';
import { NormalizedCard } from '../model/types';

function calculateCardBalance(id_card, operations, operationTypes) {
    // Создаем объект для быстрого доступа к типам операций
    const typeMap = {};
    operationTypes.forEach(type => {
        typeMap[type.id_type_operation] = type.plus;
    });

    // Фильтруем операции по карте и суммируем их
    let total = 0;
    operations
        .filter(op => op.id_card === id_card)
        .forEach(op => {
            const isIncome = typeMap[op.id_type_operation];
            const amount = op.summ / Math.pow(10, op.point_summ);
            total += isIncome ? amount : -amount;
        });

    return total;
}

const normalizeData = (
  cards: Card[],
  relations: {
    bank: any[];
    employee: any[];
    operation_card: any[];
    type_operation: any[];
  }
): NormalizedCard[] => {

  return cards.map((card) => {
    const bank = relations.bank?.find((bank) => bank.id_bank === card.id_bank);
    const employee = relations.employee?.find(
      (emp) => emp.id_employee === card.id_employee
    );

    // Расчет баланса для каждой карты
    const balance = calculateCardBalance(card.id_card, relations.operation_card, relations.type_operation);

    return {
      ...card,
      bank: bank?.name || '',
      employee: employee
        ? `${employee.last_name} ${employee.first_name}`
        : '',
      balance: formatAmount(balance),
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
          },
          // @ts-ignore
           operation_card: {
            tableName: 'operation_card',
            foreignKey: 'id_card',
            displayField: 'name'
          },
          // @ts-ignore
          type_operation: {
            tableName: 'type_operation',
            foreignKey: 'id_type_operation',
            displayField: 'name'
          }
        }}
      />
  );
};
