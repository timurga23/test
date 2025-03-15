import {
  BALANCE_PAGE_TITLE,
  CARD_PAGE_TITLE,
  EMPLOYEE_PAGE_TITLE,
  OPERATION_CARD_PAGE_TITLE,
  POSITION_PAGE_TITLE,
  RATE_PAGE_TITLE,
} from '@/entities';
import { routes } from '@/shared';
import { IconBellRinging, IconDatabaseImport, IconReceipt2 } from '@tabler/icons-react';

// todo завести таблицы по роли
export const tabs = {
  account: [
    { link: routes.POSITIONS, label: POSITION_PAGE_TITLE, icon: IconBellRinging },
    { link: routes.EMPLOYERS, label: EMPLOYEE_PAGE_TITLE, icon: IconReceipt2 },
    { link: routes.CARDS, label: CARD_PAGE_TITLE, icon: IconReceipt2 },
    { link: routes.BALANCE, label: BALANCE_PAGE_TITLE, icon: IconReceipt2 },
    { link: routes.RATE, label: RATE_PAGE_TITLE, icon: IconReceipt2 },
    { link: routes.OPERATION_CARDS, label: OPERATION_CARD_PAGE_TITLE, icon: IconReceipt2 },
  ],
  general: [{ link: '/partners', label: 'Партнеры', icon: IconDatabaseImport }],
};
