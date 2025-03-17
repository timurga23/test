import { useAddTableData, useTableData, useUpdateTableData } from '@/entities/user-table';
import { formatDateForServer, UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

interface UniversalEditModalProps {
  opened: boolean;
  onClose: () => void;
  data: Record<string, any> | null;
  refetch: () => void;
  tableName: string;
  formColumns: Record<string, any>;
  idField: string;
  relations?: {
    [key: string]: {
      tableName: string;
      valueField: string;
      labelField: string;
    };
  };
}

export const UniversalEditModal = ({
  opened,
  onClose,
  data,
  refetch,
  tableName,
  formColumns,
  idField,
  relations = {},
}: UniversalEditModalProps) => {
  const { mutateAsync: addMutation } = useAddTableData();
  const { mutateAsync: updateMutation } = useUpdateTableData();

  // Создаем уникальный список таблиц для запросов
  const uniqueTableNames = useMemo(
    () => [...new Set(Object.values(relations).map((r) => r.tableName))],
    [relations]
  );

  // Создаем один объект с данными всех таблиц
  const relationsData = uniqueTableNames.reduce(
    (acc, name) => {
      const { data: tableData } = useTableData(name);
      acc[name] = tableData || [];
      return acc;
    },
    {} as Record<string, any[]>
  );

  // Мемоизируем обновленные колонки формы
  const updatedFormColumns = useMemo(() => {
    const newFormColumns = { ...formColumns };

    for (const fieldName in newFormColumns) {
      if (newFormColumns[fieldName]?.fieldType === 'select' && relations[fieldName]) {
        const { tableName, valueField, labelField } = relations[fieldName];
        const tableData = relationsData[tableName];

        if (tableData) {
          newFormColumns[fieldName] = {
            ...newFormColumns[fieldName],
            options: tableData.map((item: any) => ({
              value: item[valueField],
              label: item[labelField],
            })),
          };
        }
      }
    }

    return newFormColumns;
  }, [formColumns, relations, relationsData]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (!data) {
        const formattedValues = Object.entries(values).reduce(
          (acc, [key, value]) => {
            if (key.toLowerCase().includes('date')) {
              acc[key] = formatDateForServer(value);
            } else {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, any>
        );

        await addMutation({
          tableName,
          data: [
            {
              // @ts-ignore
              row: Object.entries(formattedValues).map(([column, value]) => ({
                column,
                value,
              })),
            },
          ],
        });
        toast.success('Запись добавлена');
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
        toast.success('Запись обновлена');
      }

      onClose();
      refetch();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Ошибка при сохранении данных');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={!data ? 'Добавить запись' : 'Редактировать запись'}
      size="lg"
    >
      <UniversalForm
        columns={updatedFormColumns}
        defaultValues={data || {}}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
