const DEFAULT_OPERATION_TYPES = [
  {
    numb_type_operation: 1,
    name: "Приход",
    id_type_operation: "bce3696f-f930-447f-be5d-b8e87a47d627",
    plus: true
  },
  {
    numb_type_operation: 2,
    name: "Поступление",
    id_type_operation: "8cc8f161-f8fd-4ebb-b808-f886d840d3a6",
    plus: true
  },
  {
    numb_type_operation: 3,
    name: "Списание",
    id_type_operation: "07feba80-03d6-4d7c-9c2e-a5bf80627a43",
    plus: false
  },
  {
    numb_type_operation: 4,
    name: "Снятие",
    id_type_operation: "ce24ae98-c5ff-4c41-9179-df0511bb79cc",
    plus: false
  },
  {
    numb_type_operation: 5,
    name: "Расход",
    id_type_operation: "3032c839-8f27-4d76-a648-c8e0cb984694",
    plus: false
  }
];

/**
 * Рассчитывает общий баланс, остаток лимита и расходы по картам
 * @param {Array} operations - Массив операций (devData.genArr.operation_card)
 * @param {Record<string, any>} filterValues - Объект с фильтрами
 * @param {string|null} cardId - ID карты для фильтрации (null для общего баланса)
 * @param {number} [startDate] - Начальная дата периода (timestamp)
 * @returns {Object} - Объект с рассчитанными значениями
 */
export function calculateBalance(operations: any[], filterValues: Record<string, any>) {
  const { 
    cards = [], 
    operationTypes = DEFAULT_OPERATION_TYPES,
    id_type_operation,
    id_card,
    date_from,
    date_to
  } = filterValues || {};

  const cardObj = cards.reduce((acc, card) => ({ ...acc, [card.id_card]: card }), {});
  const typeObj = operationTypes.reduce((acc, type) => ({ ...acc, [type.id_type_operation]: type }), {});

  const periodStart = date_from ? new Date(date_from).getTime() : 
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const periodEnd = date_to ? new Date(date_to).getTime() : Date.now();

  const allOperations = [];
  const expenses = [];
  const incomes = [];

  operations
    .filter(op => {
      // Фильтр по карте
      if (id_card && op.id_card !== id_card) return false;
      // Фильтр по типу операции
      if (id_type_operation && op.id_type_operation !== id_type_operation) return false;
      // Фильтр по дате
      if (op.date < periodStart || op.date > periodEnd) return false;
      return true;
    })
    .forEach(op => {
      const type = typeObj[op.id_type_operation];
      if (!type) return; // Пропускаем операции с неизвестным типом
      
      const amount = op.summ / Math.pow(10, op.point_summ);
      
      allOperations.push(type.plus ? amount : -amount);
      
      if (op.date >= periodStart) {
        if (type.plus) {
          incomes.push(amount);
        } else if (op.id_type_operation === 5) {
          expenses.push(amount);
        }
      }
    });


  const totalBalance = allOperations.reduce((sum, amount) => sum + amount, 0);
  const totalExpense = expenses.reduce((sum, amount) => sum + amount, 0);
  const totalIncome = incomes.reduce((sum, amount) => sum + amount, 0);

  const result = {
    totalBalance: parseFloat(totalBalance.toFixed(2)),
    isCardSelected: !!id_card
  };

  if (id_card && cardObj[id_card]) {
    const cardLimit = cardObj[id_card].limit || 0;
    result.cardName = cardObj[id_card].name;
    result.cardLimit = cardLimit;
    result.remainingLimit = parseFloat((cardLimit - totalIncome).toFixed(2));
    result.periodExpense = parseFloat(totalExpense.toFixed(2));
    result.periodIncome = parseFloat(totalIncome.toFixed(2));
  }

  return result;
} 