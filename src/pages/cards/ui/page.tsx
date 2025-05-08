import { CardTable } from '@/widgets';
import { Container, Title } from '@mantine/core';

export const CardsPage = () => {
  return (
    <Container size="xl">
      <Title order={2} mb="lg">
        Карты
      </Title>
      <CardTable />
    </Container>
  );
};
