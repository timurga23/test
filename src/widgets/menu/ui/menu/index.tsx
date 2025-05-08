import { SwitchRoles } from '@/features/switchRoles/ui';
import { useAuth } from '@/shared';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useState } from 'react';
import { tabs } from '../../model/_routes';
import { Role } from '../../model/type';
import styles from './index.module.scss';

export function NavbarSegmented() {
  const [role, setRole] = useState<Role>(Role.ADMIN);
  const { logout } = useAuth();
  // const user = userStore((state) => state.user);

  const links = tabs[role].map((item) => (
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
        <SwitchRoles role={role} setRole={setRole} />
      </div>

      <div className={styles.navbarMain}>{links}</div>

      <div className={styles.footer}>
        <Button
          onClick={() => {
            logout();
          }}
          leftSection={<IconLogout />}
        >
          <span>Выйти</span>
        </Button>
      </div>
    </nav>
  );
}
