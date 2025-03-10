import { Select } from '@mantine/core';
import { userStore } from '@/enteties/user';

export function SwitchRoles() {
  const user = userStore((state) => state.user);

  console.log(112, user);

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
