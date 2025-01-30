import { CustomerSpecTable } from '@/widgets';
import { Flex, Text } from '@mantine/core';
import { FC } from 'react';

export const CustomerSpecPage: FC = () => {
  return (
    <Flex direction="column" gap={16} p={16}>
      <Text size="h3">Спецификация заказчика</Text>
      <CustomerSpecTable />
    </Flex>
  );
};
