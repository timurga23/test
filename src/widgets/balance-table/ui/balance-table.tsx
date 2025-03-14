import { Balance, BALANCE_COLUMNS, NormalizedBalance } from '@/entities';
import { useTableData } from '@/entities/user-table';
import { EditBalanceModal } from '@/features';
import { TableSort } from '@/shared';
import { ActionIcon, Flex, Group, Loader } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export const BalanceTable = () => {
  const [selectedBalance, setSelectedBalance] = useState<NormalizedBalance | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const { data: balances, isLoading, refetch } = useTableData<Balance>('balance');

  const handleEdit = (balance: NormalizedBalance) => {
    setSelectedBalance(balance);
    setModalOpened(true);
  };

  const handleAdd = () => {
    setSelectedBalance(null);
    setModalOpened(true);
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh" w="100%">
        <Loader />
      </Flex>
    );
  }

  console.log(112, balances);

  return (
    <>
      <Group mb="md">
        <ActionIcon variant="filled" color="blue" onClick={handleAdd} size="lg">
          <IconPlus size={20} />
        </ActionIcon>
      </Group>

      {/* @ts-ignore */}
      <TableSort<NormalizedBalance>
        data={balances as unknown as NormalizedBalance[]}
        columns={BALANCE_COLUMNS}
        onRowClick={handleEdit}
      />

      <EditBalanceModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        balance={selectedBalance}
        refetch={refetch}
      />
    </>
  );
};
