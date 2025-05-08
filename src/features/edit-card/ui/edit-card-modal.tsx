import { CARD_TABLE_NAME, useAddTableData, useTableData, useUpdateTableData } from '@/entities';
import { CARD_FORM_COLUMNS } from '@/entities/card/model/form-columns';
import { UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface EditCardModalProps {
  opened: boolean;
  onClose: () => void;
  card: Record<string, any> | null;
  refetch: () => void;
}

export const EditCardModal = ({ opened, onClose, card, refetch }: EditCardModalProps) => {
  const isNewCard = !card;
  const { mutateAsync: addMutation } = useAddTableData();
  const { mutateAsync: updateMutation } = useUpdateTableData();

  const { data: banks } = useTableData('bank');
  const { data: employees } = useTableData('employee');

  const [formColumns, setFormColumns] = useState(CARD_FORM_COLUMNS);

  // Подготавливаем начальные значения
  const initialValues = {
    name: card?.name || '',
    fio: card?.fio || '',
    number: card?.number || '',
    id_bank: card?.id_bank || '',
    description: card?.description || '',
    id_employee: card?.id_employee || '',
    limit_amount: card?.limit_amount || 0,
    blocking: card?.blocking === null ? false : card?.blocking, // Устанавливаем false если null
  };

  useEffect(() => {
    if (banks && employees) {
      setFormColumns({
        ...CARD_FORM_COLUMNS,
        id_bank: {
          ...CARD_FORM_COLUMNS.id_bank,
          // @ts-ignore
          options: banks.map((bank) => ({
            value: bank.id_bank,
            label: bank.name,
          })),
        },
        id_employee: {
          ...CARD_FORM_COLUMNS.id_employee,
          // @ts-ignore
          options: employees.map((emp) => ({
            value: emp.id_employee,
            label: `${emp.last_name} ${emp.first_name}`,
          })),
        },
      });
    }
  }, [banks, employees]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (isNewCard) {
        await addMutation({
          tableName: CARD_TABLE_NAME,
          data: [
            {
              // @ts-ignore
              row: Object.entries(values).map(([column, value]) => ({
                column,
                value,
              })),
            },
          ],
        });
      } else {
        await updateMutation({
          tableName: CARD_TABLE_NAME,
          data: [
            {
              filter: [{ column: 'id_card', value: card.id_card }],
              row: Object.entries(values)
                .filter(([key, value]) => value !== card[key])
                .map(([column, value]) => ({
                  column,
                  value,
                })),
            },
          ],
        });
      }

      onClose();
      refetch();
      toast.success(isNewCard ? 'Карта добавлена' : 'Карта обновлена');
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Ошибка при сохранении данных');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isNewCard ? 'Добавить карту' : 'Редактировать карту'}
      size="lg"
    >
      {/* @ts-ignore */}
      <UniversalForm columns={formColumns} defaultValues={initialValues} onSubmit={handleSubmit} />
    </Modal>
  );
};
