import { ICustomerSpec } from "./types";

export const data:ICustomerSpec[] = [
    {
      name: 'Спецификация №1',
      date: '01.01.2024',
      price: '1500000',
      shipped: '30',
      readyToShip: '20',
      remaining: '50', 
      supplier: 'ООО Поставщик 1',
      currency: 'EUR/RUB',
    },
    {
      name: 'Спецификация №2',
      date: '02.01.2024', 
      price: '2300000',
      shipped: '45',
      readyToShip: '15',
      remaining: '40',
      supplier: 'ООО Поставщик 2',
      currency: 'EUR/RUB',
    },
    {
      name: 'Спецификация №3',
      date: '03.01.2024',
      price: '980000',
      shipped: '60',
      readyToShip: '25',
      remaining: '15',
      supplier: 'ООО Поставщик 3',
      currency: 'EUR/RUB',
    },
  ];

  export const columns = [
    { key: 'name', label: 'Наименование' },
    { key: 'date', label: 'Дата' },
    { key: 'price', label: 'Стоимость(продажа)' },
    { key: 'shipped', label: 'Отгружено %' },
    { key: 'readyToShip', label: 'Готово к отгрузке %' }, 
    { key: 'remaining', label: 'Остаток' },
    { key: 'supplier', label: 'Поставщик' }
  ];