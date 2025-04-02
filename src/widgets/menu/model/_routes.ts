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
import { IconBellRinging, IconDatabaseImport, IconReceipt2 } from '@tabler/icons-react';

// todo завести таблицы по роли
export const tabs = {
  account: [
    { link: '/positions', label: POSITION_PAGE_TITLE, icon: IconBellRinging },
    { link: '/employers', label: EMPLOYEE_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/cards', label: CARD_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/balance', label: BALANCE_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/rate', label: RATE_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/operation-cards', label: OPERATION_CARD_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/clients', label: CLIENT_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/orders', label: ORDER_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/cargos', label: CARGO_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/buyouts', label: BUYOUT_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/torg12s', label: TORG12_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/corrections', label: CORRECTION_PAGE_TITLE, icon: IconReceipt2 },
    { link: '/operation-safes', label: OPERATION_SAFE_PAGE_TITLE, icon: IconReceipt2 },
  ],
  general: [{ link: '/partners', label: 'Партнеры', icon: IconDatabaseImport }],
};
