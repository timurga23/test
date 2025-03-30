import {
  BALANCE_ROUTE_NAME,
  CARD_ROUTE_NAME,
  CARGO_ROUTE_NAME,
  EMPLOYEE_ROUTE_NAME,
  OPERATION_CARD_ROUTE_NAME,
  ORDER_ROUTE_NAME,
  POSITION_ROUTE_NAME,
  RATE_ROUTE_NAME,
} from '@/entities';

// todo переделать хранение роутов так как использование сущностей тут не очень хорошо
export const routes = {
  WELCOME: '/',
  POSITIONS: `/${POSITION_ROUTE_NAME}`,
  EMPLOYERS: `/${EMPLOYEE_ROUTE_NAME}`,
  LOGIN: '/login',
  CARDS: `/${CARD_ROUTE_NAME}`,
  BALANCE: `/${BALANCE_ROUTE_NAME}`,
  RATE: `/${RATE_ROUTE_NAME}`,
  OPERATION_CARDS: `/${OPERATION_CARD_ROUTE_NAME}`,
  ORDERS: `/${ORDER_ROUTE_NAME}`,
  CARGO: `/${CARGO_ROUTE_NAME}`,
};
