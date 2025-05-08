import {
  BALANCE_PAGE_TITLE,
  BUYOUT_PAGE_TITLE,
  CARD_PAGE_TITLE,
  CARGO_PAGE_TITLE,
  CLIENT_PAGE_TITLE,
  CORRECTION_PAGE_TITLE,
  EMPLOYEE_PAGE_TITLE,
  OPERATION_CARD_PAGE_TITLE,
  OPERATION_SAFE_PAGE_TITLE,
  ORDER_PAGE_TITLE,
  POSITION_PAGE_TITLE,
  RATE_PAGE_TITLE,
  TORG12_PAGE_TITLE,
} from '@/entities';
import {
  IconCards,
  IconCreditCard,
  IconCurrencyDollar,
  IconEdit,
  IconFileInvoice,
  IconShield,
  IconShoppingBag,
  IconShoppingCart,
  IconTruck,
  IconUserCircle,
  IconUserCog,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';
import { RoleTabs } from './type';

// todo завести таблицы по роли
export const tabs: RoleTabs = {
  admin: [
    { link: '/positions', label: POSITION_PAGE_TITLE, icon: IconUserCog },
    { link: '/employers', label: EMPLOYEE_PAGE_TITLE, icon: IconUsers },
    { link: '/cards', label: CARD_PAGE_TITLE, icon: IconCreditCard },
    { link: '/balance', label: BALANCE_PAGE_TITLE, icon: IconWallet },
    { link: '/rate', label: RATE_PAGE_TITLE, icon: IconCurrencyDollar },
    { link: '/operation-cards', label: OPERATION_CARD_PAGE_TITLE, icon: IconCards },
    { link: '/clients', label: CLIENT_PAGE_TITLE, icon: IconUserCircle },
    { link: '/orders', label: ORDER_PAGE_TITLE, icon: IconShoppingCart },
    { link: '/cargos', label: CARGO_PAGE_TITLE, icon: IconTruck },
    { link: '/buyouts', label: BUYOUT_PAGE_TITLE, icon: IconShoppingBag },
    { link: '/torg12s', label: TORG12_PAGE_TITLE, icon: IconFileInvoice },
    { link: '/corrections', label: CORRECTION_PAGE_TITLE, icon: IconEdit },
    { link: '/operation-safes', label: OPERATION_SAFE_PAGE_TITLE, icon: IconShield },
  ],
  manager: [
    { link: '/clients', label: CLIENT_PAGE_TITLE, icon: IconUserCircle },
    { link: '/orders', label: ORDER_PAGE_TITLE, icon: IconShoppingCart },
    { link: '/cargos', label: CARGO_PAGE_TITLE, icon: IconTruck },
    { link: '/buyouts', label: BUYOUT_PAGE_TITLE, icon: IconShoppingBag },
  ],
  supplier: [
    { link: '/orders', label: ORDER_PAGE_TITLE, icon: IconShoppingCart },
    { link: '/cargos', label: CARGO_PAGE_TITLE, icon: IconTruck },
    { link: '/buyouts', label: BUYOUT_PAGE_TITLE, icon: IconShoppingBag },
  ],
};
