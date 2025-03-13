import { userStore } from '@/entities';
import { Select } from '@mantine/core';

export function SwitchRoles() {
  const user = userStore((state) => state.user);

  return (
    <Select
      placeholder="Выберите роль"
      data={
        user?.roles?.map((role) => ({
          value: role,
          label: role,
        })) || []
      }
      defaultValue={user?.roles?.[0]}
    />
  );
}
