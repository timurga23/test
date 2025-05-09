import { CARD_TABLE_NAME } from '@/entities';
import {
  ANALYTICS_CARD_BALANCE_COLUMNS,
  NormalizedOperationCard,
  OPERATION_CARD_TABLE_NAME,
  OperationCard
} from '@/entities/operation-card';
import { CrudTable } from '@/shared/ui';

export const AnalyticsCardBalanceTable = () => {
  const normalizeData = (
    operations: OperationCard[],
    relations: { card: any[], type_operation: any[] }
  ): NormalizedOperationCard[] => {
    // Создаем объект для хранения типов операций и их признаков
    const typeOperations: { [key: string]: boolean } = {};
    relations?.type_operation?.forEach((type) => {
      typeOperations[type.id_type_operation] = type.plus;
    });

    // Создаем объект для хранения балансов карт
    const cardBalances: { [key: string]: number } = {};
    
    // Рассчитываем баланс для каждой карты
    operations?.forEach((operation) => {
      const cardId = operation.id_card;
      if (!cardBalances[cardId]) {
        cardBalances[cardId] = 0;
      }
      
      const amount = operation.summ / Math.pow(10, operation.point_summ);
      // Используем признак из typeOperations для определения знака
      cardBalances[cardId] += typeOperations[operation.id_type_operation] ? amount : -amount;
    });

    // Преобразуем в массив с нужной структурой
    return relations?.card?.map((card) => ({
      id_card: card.id_card,
      card: card.name,
      balance: cardBalances[card.id_card] || 0
    }));
  };

  return (
    <CrudTable<OperationCard, NormalizedOperationCard>
      tableName={OPERATION_CARD_TABLE_NAME}
      columns={ANALYTICS_CARD_BALANCE_COLUMNS}
      idField="id_card"
      normalizeData={normalizeData}
      relations={{
        card: {
          tableName: CARD_TABLE_NAME,
          valueField: 'id_card',
          labelField: 'name',
        },
         type_operation: {
          tableName: 'type_operation',
          valueField: 'id_type_operation',
          labelField: 'name',
        },
      }}
      isEditable={false}
    />
  );
};
