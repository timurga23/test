import { Select } from '@mantine/core';
import { userStore } from '@/enteties';

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
