import { SwitchRoles } from '@/features/swithRoles/ui';
import { IconBellRinging, IconDatabaseImport, IconReceipt2 } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './index.module.scss';

// todo завести таблицы по роли
const tabs = {
  account: [
    { link: '/positions', label: 'Должности', icon: IconBellRinging },
    { link: '/employers', label: 'Сотрудники', icon: IconReceipt2 },
  ],
  general: [{ link: '/partners', label: 'Партнеры', icon: IconDatabaseImport }],
};

export function NavbarSegmented() {
  const [section, _] = useState<'account' | 'general'>('account');

  const links = tabs[section].map((item) => (
    <a
      className={styles.link}
      data-active={item.link === window.location.pathname || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={styles.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={styles.navbar}>
      <div>
        <SwitchRoles />
      </div>

      <div className={styles.navbarMain}>{links}</div>

      <div className={styles.footer}>
        {/* <Button
          onClick={() => {
            // logout();
          }}
          leftSection={<IconLogout />}
        >
          <span>Выйти</span>
        </Button> */}
      </div>
    </nav>
  );
}
