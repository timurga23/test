import { Card, CARD_COLUMNS } from '@/entities/card';
import { useTableData } from '@/entities/user-table';
import { EditCardModal } from '@/features';
import { TableSort } from '@/shared/ui/table/table';
import { ActionIcon, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { NormalizedCard } from '../model/types';

export const CardTable = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const { data: cards, refetch } = useTableData<Card>('card');
  const { data: banks } = useTableData('bank');
  const { data: employees } = useTableData('employee');

  // @ts-ignore
  const normalizedData: NormalizedCard[] =
    cards?.map((card) => ({
      ...card,
      bank: banks?.find((bank) => bank.id_bank === card.id_bank)?.name || '',
      employee: employees?.find((emp) => emp.id_employee === card.id_employee)
        ? `${employees?.find((emp) => emp.id_employee === card.id_employee)?.last_name} ${employees?.find((emp) => emp.id_employee === card.id_employee)?.first_name}`
        : '',
    })) || [];

  const handleEdit = (card: NormalizedCard) => {
    // Находим оригинальную карту для редактирования
    const originalCard = cards?.find((c) => c.id_card === card.id_card) || null;
    setSelectedCard(originalCard);
    setModalOpened(true);
  };

  const handleAdd = () => {
    setSelectedCard(null);
    setModalOpened(true);
  };

  return (
    <>
      <Group mb="md">
        <ActionIcon variant="filled" color="blue" onClick={handleAdd} size="lg">
          <IconPlus size={20} />
        </ActionIcon>
      </Group>

      <TableSort<NormalizedCard>
        data={normalizedData}
        columns={CARD_COLUMNS}
        onRowClick={handleEdit}
      />

      <EditCardModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        card={selectedCard}
        refetch={refetch}
      />
    </>
  );
};
