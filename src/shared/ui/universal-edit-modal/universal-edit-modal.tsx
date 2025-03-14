import { useAddTableData, useUpdateTableData } from '@/entities';
import { UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { toast } from 'react-toastify';

interface FormColumn {
  label: string;
  type: string;
  required?: boolean;
}

interface UniversalEditModalProps {
  opened: boolean;
  onClose: () => void;
  data: Record<string, any> | null;
  refetch: () => void;
  tableName: string;
  formColumns: Record<string, FormColumn>;
  idField: string;
}

export const UniversalEditModal = ({
  opened,
  onClose,
  data,
  refetch,
  tableName,
  formColumns,
  idField,
}: UniversalEditModalProps) => {
  const isNew = !data;
  const { mutateAsync: addMutation } = useAddTableData();
  const { mutateAsync: updateMutation } = useUpdateTableData();

  // Подготавливаем начальные значения из колонок формы
  const initialValues = Object.keys(formColumns).reduce(
    (acc, key) => ({
      ...acc,
      [key]: data?.[key] || '',
    }),
    {}
  );

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (isNew) {
        await addMutation({
          tableName,
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
          tableName,
          data: [
            {
              filter: [{ column: idField, value: data[idField] }],
              row: Object.entries(values)
                .filter(([key, value]) => value !== data[key])
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
      toast.success(isNew ? 'Запись успешно добавлена' : 'Запись успешно обновлена');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Ошибка при сохранении данных');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isNew ? 'Добавить запись' : 'Редактировать запись'}
      size="lg"
    >
      {/* @ts-ignore */}
      <UniversalForm columns={formColumns} defaultValues={initialValues} onSubmit={handleSubmit} />
    </Modal>
  );
};
