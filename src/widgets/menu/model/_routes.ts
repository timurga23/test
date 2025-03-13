import { IconBellRinging, IconDatabaseImport, IconReceipt2 } from '@tabler/icons-react';

// todo завести таблицы по роли
export const tabs = {
  account: [
    { link: '/positions', label: 'Должности', icon: IconBellRinging },
    { link: '/employers', label: 'Сотрудники', icon: IconReceipt2 },
    { link: '/cards', label: 'Карты', icon: IconReceipt2 },
  ],
  general: [{ link: '/partners', label: 'Партнеры', icon: IconDatabaseImport }],
};
