import { Position, POSITION_TABLE_NAME, useUpdateTableData } from '@/enteties';
import { UniversalForm } from '@/shared/ui';
import { Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getPositionColumns } from '../lib/get-position-columns';

interface EditPositionModalProps {
  position: Position | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditPositionModal = ({
  position,
  isOpen,
  onClose,
}: EditPositionModalProps) => {
  const { mutateAsync: updateMutation, isPending: isUpdating } = useUpdateTableData();
  const queryClient = useQueryClient();

  if (!position) return null;

  const columns = getPositionColumns();

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      await updateMutation({
        tableName: POSITION_TABLE_NAME,
        data: [{
          filter: [{ column: 'id_position', value: position.id_position }],
          row: [{ column: 'name', value: values.name }]
        }]
      });

      await queryClient.invalidateQueries({ queryKey: ['table', POSITION_TABLE_NAME] });
      toast.success('Должность успешно обновлена');
      onClose();
    } catch (error) {
      console.error('Error updating position:', error);
      toast.error('Ошибка при обновлении должности');
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Редактирование должности">
      <UniversalForm
        columns={columns}
        defaultValues={position}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </Modal>
  );
}; 