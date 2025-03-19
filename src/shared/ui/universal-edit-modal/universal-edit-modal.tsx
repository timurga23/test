import {
  useAddTableData,
  useDeleteTableRow,
  useTableData,
  useUpdateTableData,
} from '@/entities/user-table';
import { formatDateForServer, UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

interface UniversalEditModalProps<T = any> {
  opened: boolean;
  onClose: () => void;
  data: T | null;
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

export const UniversalEditModal = <T extends Record<string, any>>({
  opened,
  onClose,
  data,
  refetch,
  tableName,
  formColumns,
  idField,
  relations = {},
}: UniversalEditModalProps<T>) => {
  const { mutateAsync: addMutation } = useAddTableData();
  const { mutateAsync: updateMutation } = useUpdateTableData();
  const { mutateAsync: deleteMutation } = useDeleteTableRow();

  // Создаем уникальный список таблиц для запросов
  const uniqueTableNames = useMemo(() => {
    const tables = new Set<string>();

    Object.entries(formColumns).forEach(([_, column]) => {
      if (column?.fieldType === 'select' && relations[column.key]) {
        tables.add(relations[column.key].tableName);
      } else if (column?.fieldType === 'multiselect' && column?.relation) {
        tables.add(column?.relation?.table);
        if (column?.relation?.through) {
          tables.add(column?.relation?.through?.table);
        }
      }
    });

    return Array.from(tables);
  }, [formColumns, relations]);

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
      const column = newFormColumns[fieldName];

      if (column.fieldType === 'select' && relations[fieldName]) {
        const { tableName, valueField, labelField } = relations[fieldName];
        const tableData = relationsData[tableName];

        if (tableData) {
          newFormColumns[fieldName] = {
            ...column,
            options: tableData.map((item: any) => ({
              value: item[valueField],
              label: item[labelField],
            })),
          };
        }
      } else if (column?.fieldType === 'multiselect' && column.relation) {
        const { table, value, label, through } = column.relation;
        const tableData = relationsData[table];
        const throughData = through ? relationsData[through.table] : null;

        if (tableData) {
          let selectedValues: string[] = [];

          if (data && through) {
            selectedValues =
              throughData
                ?.filter((item: any) => item[through.relationKey] === data[idField])
                ?.map((item: any) => item[through.foreignKey]) || [];
          }

          newFormColumns[fieldName] = {
            ...column,
            options: tableData.map((item: any) => ({
              value: item[value],
              label: item[label],
            })),
            defaultValue: selectedValues,
          };
        }
      }
    }

    return newFormColumns;
  }, [formColumns, relations, relationsData, data, idField]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const formattedValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          const column = formColumns[key];

          if (column?.fieldType === 'multiselect' && column?.relation?.through) {
            // Пропускаем это поле, оно будет обработано отдельно
            return acc;
          }

          if (key.toLowerCase().includes('date')) {
            acc[key] = formatDateForServer(value);
          } else {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      if (!data) {
        // Добавление новой записи
        const result = await addMutation({
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

        // Обработка связей many-to-many после создания основной записи
        const newId = result[0][idField];
        // @ts-ignore
        await handleManyToManyRelations(values, newId);

        toast.success('Запись добавлена');
      } else {
        const rows = Object.entries(formattedValues)
          .filter(([key, value]) => value !== data[key])
          .map(([column, value]) => ({
            column,
            value,
          }));

        if (rows.length > 0) {
          // Обновление существующей записи
          await updateMutation({
            tableName,
            data: [
              {
                filter: [{ column: idField, value: data[idField] }],
                row: rows,
              },
            ],
          });
        }

        // Обновление связей many-to-many
        await handleManyToManyRelations(values, data[idField]);

        toast.success('Запись обновлена');
      }

      onClose();
      refetch();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Ошибка при сохранении данных');
    }
  };

  const handleManyToManyRelations = async (values: Record<string, any>, recordId: string) => {
    for (const [fieldName, value] of Object.entries(values)) {
      const column = formColumns[fieldName];
      if (column?.fieldType === 'multiselect' && column?.relation?.through) {
        const { through } = column.relation;

        // Сначала удаляем все существующие связи
        await deleteMutation({
          tableName: through.table,
          data: [{ column: through.relationKey, value: recordId }],
        });

        // Добавляем новые связи
        if (Array.isArray(value) && value.length > 0) {
          await addMutation({
            tableName: through.table,
            // @ts-ignore
            data: value.map((foreignId) => ({
              row: [
                { column: through.relationKey, value: recordId },
                { column: through.foreignKey, value: foreignId },
              ],
            })),
          });
        }
      }
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
