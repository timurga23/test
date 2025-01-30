import { EmployersTable } from '@/widgets';
import { Flex, Text } from '@mantine/core';
import { FC } from 'react';

export const EmployersPage: FC = () => {
  return (
    <Flex direction="column" gap={16} p={16}>
      <Text size="h3">Таблица Сотрудников</Text>
      <EmployersTable />
    </Flex>
  );
};
