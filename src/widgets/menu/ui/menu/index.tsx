import { SwitchRoles } from '@/features/swithRoles/ui';
import { useState } from 'react';
import styles from './index.module.scss';
import { tabs } from '../../model/_routes';


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
