import { routes } from '@/shared';
import { IconBellRinging, IconDatabaseImport, IconReceipt2 } from '@tabler/icons-react';

// todo завести таблицы по роли
export const tabs = {
  account: [
    { link: routes.POSITIONS, label: 'Должности', icon: IconBellRinging },
    { link: routes.EMPLOYERS, label: 'Сотрудники', icon: IconReceipt2 },
    { link: routes.CARDS, label: 'Карты', icon: IconReceipt2 },
    { link: routes.BALANCE, label: 'Балансы', icon: IconReceipt2 },
    { link: routes.RATE, label: 'Тарифы', icon: IconReceipt2 },
  ],
  general: [{ link: '/partners', label: 'Партнеры', icon: IconDatabaseImport }],
};
