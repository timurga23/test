import {
  BALANCE_FORM_COLUMNS,
  BALANCE_TABLE_NAME,
  useAddTableData,
  useUpdateTableData,
} from '@/entities';
import { UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface EditBalanceModalProps {
  opened: boolean;
  onClose: () => void;
  balance: Record<string, any> | null;
  refetch: () => void;
}

export const EditBalanceModal = ({ opened, onClose, balance, refetch }: EditBalanceModalProps) => {
  const isNewBalance = !balance;
  const { mutateAsync: addMutation } = useAddTableData();
  const { mutateAsync: updateMutation } = useUpdateTableData();

  const [formColumns] = useState(BALANCE_FORM_COLUMNS);

  // Подготавливаем начальные значения
  const initialValues = {
    name: balance?.name || '',
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (isNewBalance) {
        await addMutation({
          tableName: BALANCE_TABLE_NAME,
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
          tableName: BALANCE_TABLE_NAME,
          data: [
            {
              filter: [{ column: 'id_balance', value: balance.id_balance }],
              row: Object.entries(values)
                .filter(([key, value]) => value !== balance[key])
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
      toast.success(isNewBalance ? 'Баланс добавлен' : 'Баланс обновлен');
    } catch (error) {
      console.error('Error saving balance:', error);
      toast.error('Ошибка при сохранении данных');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isNewBalance ? 'Добавить баланс' : 'Редактировать баланс'}
      size="lg"
    >
      {/* @ts-ignore */}
      <UniversalForm columns={formColumns} defaultValues={initialValues} onSubmit={handleSubmit} />
    </Modal>
  );
};
