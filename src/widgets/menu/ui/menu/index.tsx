import { useAuth } from '@/shared/auth/AuthContext';
import { SegmentedControl } from '@mantine/core';
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
} from '@tabler/icons-react';
import { useState } from 'react';
import styles from './index.module.scss';

const tabs = {
  account: [
    { link: '/positions', label: 'Должности', icon: IconBellRinging },
    { link: '/employers', label: 'Сотрудники', icon: IconReceipt2 },
    { link: '/actions', label: 'Типы действий', icon: IconFingerprint },
    { link: '/currency', label: 'Валюта', icon: IconKey },
    { link: '/partners', label: 'Партнеры', icon: IconDatabaseImport },
    { link: '/customer-spec', label: 'Спецификация заказчика', icon: Icon2fa },
    { link: '/supplier-spec', label: 'Спецификация поставщика', icon: IconSettings },
    { link: '/orders', label: 'Ордера', icon: IconSettings },
  ],
  general: [
    { link: '/partners', label: 'Партнеры', icon: IconDatabaseImport },
    { link: '', label: 'Спецификация заказчика', icon: Icon2fa },
    { link: '', label: 'Спецификация поставщика', icon: IconSettings },
    { link: '', label: 'Ордера', icon: IconSettings },
  ],
};

export function NavbarSegmented() {
  const [section, setSection] = useState<'account' | 'general'>('account');

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

  const { logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div>
        <SegmentedControl
          value={section}
          onChange={(value: any) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'Директор', value: 'account' },
            { label: 'Оператор', value: 'general' },
          ]}
        />
      </div>

      <div className={styles.navbarMain}>{links}</div>

      <div className={styles.footer}>
        <a href="#" className={styles.link} onClick={() => {
          logout();
        }}>
          <IconLogout className={styles.linkIcon} stroke={1.5} />
          <span>Выйти</span>
        </a>
      </div>
    </nav>
  );
}
