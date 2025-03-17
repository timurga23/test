import {
  BALANCE_PAGE_TITLE,
  CARD_PAGE_TITLE,
  CLIENT_PAGE_TITLE,
  EMPLOYEE_PAGE_TITLE,
  OPERATION_CARD_PAGE_TITLE,
  POSITION_PAGE_TITLE,
  RATE_PAGE_TITLE,
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
  ],
  general: [{ link: '/partners', label: 'Партнеры', icon: IconDatabaseImport }],
};
