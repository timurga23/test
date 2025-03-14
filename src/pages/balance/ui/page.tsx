import { BalanceTable } from '@/widgets';
import { Container, Title } from '@mantine/core';

export const BalancePage = () => {
  return (
    <Container size="xl" pl={0} pr={0} ml={20} mr={0} w="100%">
      <Title order={2} mb="lg">
        Балансы
      </Title>
      <BalanceTable />
    </Container>
  );
};
