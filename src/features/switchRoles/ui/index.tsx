import { Select } from '@mantine/core';
import { ROLES } from '../model/_constant';
import { Role } from '@/widgets/menu/model/type';

export function SwitchRoles({ role, setRole }: { role: Role; setRole: (role: Role) => void }) {
  return (
    <Select
      placeholder="Выберите роль"
      // @ts-ignore
      data={ROLES.map((role) => ({
        value: role.value,
        label: role.label,
      }))}
      defaultValue={role}
      onChange={(value) => setRole(value as Role)}
    />
  );
}
