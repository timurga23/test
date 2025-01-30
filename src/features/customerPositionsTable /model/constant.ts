export const data = [
  {
    index: 1,
    id: 'P-001',
    name: 'Товар 1',
    plan: 100,
    zakaz: 80,
    fact: 75,
    price: 1000,
    priceBuyPlan: 800,
    priceBuyFact: 850,
    amountSell: 75000,
    profitPlan: 20000,
    profitFact: 11250
  },
  {
    index: 2, 
    id: 'P-002',
    name: 'Товар 2',
    plan: 50,
    zakaz: 45,
    fact: 40,
    price: 2000,
    priceBuyPlan: 1600,
    priceBuyFact: 1700,
    amountSell: 80000,
    profitPlan: 20000,
    profitFact: 12000
  }
  ];

  export const columns = [
    { key: 'index', label: '№' },
    { key: 'id', label: 'ИД позиции' },
    { key: 'name', label: 'Наименование' },
    { key: 'сcount', label: 'Колво', subColumns: [{ key: 'plan', label: 'план' }, { key: 'zakaz', label: 'заказ' }, { key: 'fact', label: 'факт' }] },
    { key: 'price', label: 'Цена продажи' },
    { key: 'priceBuy', label: 'Цена закупки', subColumns: [{ key: 'priceBuyPlan', label: 'план' }, { key: 'priceBuyFact', label: 'факт' }] },
    { key: 'amountSell', label: 'Cтоимость продажи',  },
    { key: 'profit', label: 'Прибыль', subColumns: [{ key: 'profitPlan', label: 'план' }, { key: 'profitFact', label: 'факт' }] },
  ];
