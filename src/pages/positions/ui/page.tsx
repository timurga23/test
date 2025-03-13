import { POSITION_TABLE_NAME, Position, useTableData } from '@/entities';
import { PositionTable } from '@/widgets';
import { Flex, Loader, Text } from '@mantine/core';
import { FC } from 'react';

export const PositionsPage: FC = () => {
  const {
    data: positions,
    isError: isErrorPositions,
    isLoading: isLoadingPositions,
  } = useTableData<Position>(POSITION_TABLE_NAME);

  if (isLoadingPositions) {
    return (
      <Flex align="center" justify="center" h="100vh" w="100%">
        <Loader />
      </Flex>
    );
  }

  if (isErrorPositions) {
    return <Text>Ошибка при загрузке данных</Text>;
  }

  return (
    <Flex direction="column" gap={16} p={16}>
      <Text size="h3">Наименование должностей</Text>
      <PositionTable positions={positions || []} />
    </Flex>
  );
};
