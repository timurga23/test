import {
  useAddTableData,
  useDeleteTableRow,
  useTableData,
  useUpdateTableData,
} from '@/entities/user-table';
import { formatDateForServer, UniversalForm } from '@/shared';
import { DeliveryBlock } from '@/widgets';
import { Grid, Modal } from '@mantine/core';
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
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  autoNumberFields?: string[];
  tableData: T[];
  relationsData: Record<string, any[]>;
}

const RELATION_FIELDS = ['positions', 'select', 'multiselect', 'dynamic-inputs'];

export const UniversalEditModal = <T extends Record<string, any>>({
  opened,
  onClose,
  data,
  refetch,
  tableName,
  formColumns,
  idField,
  relations = {},
  modalSize = 'lg',
  autoNumberFields = [],
  tableData,
  relationsData,
}: UniversalEditModalProps<T>) => {
  const { mutateAsync: addMutation } = useAddTableData();
  const { mutateAsync: updateMutation } = useUpdateTableData();
  const { mutateAsync: deleteMutation } = useDeleteTableRow();
  const { data: versionsData, refetch: refetchVersions } = useTableData('versions');

  // Сохраняем время начала редактирования в миллисекундах
  let editStartTime = useMemo(() => Date.now(), [opened]);

  // Мемоизируем обновленные колонки формы
  const updatedFormColumns = useMemo(() => {
    const newFormColumns = { ...formColumns };

    for (const fieldName in newFormColumns) {
      const column = newFormColumns[fieldName];

      if (column?.fieldType === 'select' && Array.isArray(column.relation.table)) {
        let allOptions: any[] = [];
        column.relation.table.forEach((tableName: string) => {
          const tableData = relationsData[tableName];
          if (tableData) {
            const target =
              column.relation.linkedField?.table === tableName
                ? column.relation.linkedField
                : column.relation;
            allOptions = allOptions.concat(
              tableData.map((item: any) => ({
                value: item[target.value],
                label: `${target.prefix} ${item[target.label]}`,
                table: tableName,
              }))
            );
          }
        });
        if (allOptions.length > 0) {
          newFormColumns[fieldName] = {
            ...column,
            options: allOptions,
          };
        }
      } else if (column?.fieldType === 'select' && relations[fieldName]) {
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
      } else if (column?.fieldType === 'multiselect' && column?.relation) {
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
      // Проверяем версию таблицы перед сохранением
      if (data) {
        // Запрашиваем актуальную версию перед сохранением
        await refetchVersions();
        const tableVersion = versionsData?.find((v: any) => v.name === tableName);

        // Проверяем, что версия существует и время изменения больше времени начала редактирования
        if (tableVersion && Number(tableVersion.lastChangeTime) > editStartTime) {
          // Обновляем время начала редактирования для следующей попытки
          editStartTime = Date.now();
          toast.error('Данные были изменены другим пользователем. Пожалуйста, обновите страницу.');
          return;
        }
      }

      const formattedValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          const column = formColumns[key];

          // Пропускаем поля с through отношениями
          if (RELATION_FIELDS.includes(column?.fieldType) && column?.relation?.through) {
            return acc;
          }

          const isLinkedField = column?.fieldType === 'select' && column?.relation?.linkedField;

          // Обработка связанных полей
          if (isLinkedField) {
            const key = column.relation.value;
            const options = updatedFormColumns[key].options;
            const table = options.find((option: any) => option.value === value).table;
            const targetKey = `id_${table}`;

            if (key === targetKey) {
              acc[key] = null;
              acc[targetKey] = value;
            } else {
              acc[targetKey] = value;
              acc[key] = null;
            }

            // if (value && typeof value === 'object' && 'table' in value) {

            //   const { table: selectedTable, value: selectedValue } = value;
            //   const { table: configTables, linkedField } = column.relation;

            //   // Получаем массив таблиц из конфигурации
            //   const tables = Array.isArray(configTables) ? configTables : [configTables];

            //   // Определяем, в какое поле записывать значение
            //   if (selectedTable === tables[0]) {
            //     acc[key] = selectedValue; // Записываем в основное поле
            //     acc[linkedField.mapping] = null; // Очищаем связанное поле
            //   } else {
            //     acc[key] = null; // Очищаем основное поле
            //     acc[linkedField.mapping] = selectedValue; // Записываем в связанное поле
            //   }
            //   return acc;
            // }
          }

          if (key === 'delivery') {
            // Если это delivery, добавляем все его поля как отдельные
            Object.entries(value).forEach(([deliveryKey, deliveryValue]) => {
              // Пропускаем поля, которые уже есть в основной форме
              if (!values[deliveryKey]) {
                acc[deliveryKey] = deliveryValue;
              }
            });
          }

          if (key?.toLowerCase().includes('date')) {
            acc[key] = formatDateForServer(value);
          } else if (key !== 'delivery' && acc[key] === undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      // Удаляем undefined значения перед отправкой
      Object.keys(formattedValues).forEach((key) => {
        if (formattedValues[key] === undefined) {
          delete formattedValues[key];
        }
      });

      if (!data) {
        // Используем переданные данные таблицы вместо нового запроса
        const maxValues = autoNumberFields.map((field) => {
          const maxValue = Math.max(...(tableData || []).map((item: any) => item[field] || 0));
          return { field, maxValue };
        });

        // Добавляем новые значения в formattedValues
        maxValues.forEach(({ field, maxValue }) => {
          formattedValues[field] = maxValue + 1;
        });

        // Добавление новой записи
        const result = await addMutation({
          tableName,
          data: [
            {
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
        await handleRelations(values, newId);

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

        // Обновление связей
        await handleRelations(values, data[idField]);

        toast.success('Запись обновлена');
      }

      onClose();
      refetch();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Ошибка при сохранении данных');
    }
  };

  // Обновленная функция для обработки всех типов связей
  const handleRelations = async (values: Record<string, any>, recordId: string) => {
    for (const [fieldName, value] of Object.entries(values)) {
      const column = formColumns[fieldName];
      if (!column?.relation?.through) continue;

      const { through } = column.relation;

      if (column.fieldType === 'positions') {
        // Удаляем старые позиции
        await deleteMutation({
          tableName: through.table,
          data: [{ column: through.relationKey, value: recordId }],
        });

        // Добавляем новые позиции
        if (Array.isArray(value) && value.length > 0) {
          await addMutation({
            tableName: through.table,
            // @ts-ignore
            data: value.map((position) => ({
              row: [
                ...Object.entries(position)
                  .filter(([column]) => column !== 'id_position')
                  .map(([column, value]) => ({
                    column,
                    value,
                  })),
              ],
            })),
          });
        }
      } else {
        const isAddMultiselect =
          column?.fieldType === 'multiselect' &&
          Array.isArray(value) &&
          value.length > 0 &&
          !value?.some((item: any) => !item);

        const isAddSelect = column?.fieldType === 'select' && value;

        const isAddDynamicInputs = column?.fieldType === 'dynamic-inputs' && value;

        // Сначала удаляем все существующие связи
        await deleteMutation({
          tableName: through.table,
          data: [{ column: through.relationKey, value: recordId }],
        });

        // Добавляем новые связи
        if (isAddMultiselect) {
          // Для multiselect добавляем все выбранные значения
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
        } else if (isAddSelect) {
          // Для select добавляем одно значение
          await addMutation({
            tableName: through.table,
            data: [
              {
                // @ts-ignore
                row: [
                  { column: through.relationKey, value: recordId },
                  { column: through.foreignKey, value: value },
                ],
              },
            ],
          });
        } else if (isAddDynamicInputs) {
          // Для dynamic-inputs добавляем все выбранные значения
          await addMutation({
            tableName: through.table,
            // @ts-ignore
            data: value.map((contactValue) => ({
              row: [
                { column: through.relationKey, value: recordId },
                { column: 'value', value: contactValue },
                { column: 'id_type_contact', value: '32607bfc-2894-4e01-89e4-9b47c9ad52b3' }, // TODO: change to default value
              ],
            })),
          });
        }
      }
    }
  };

  const deliveryFields = formColumns.delivery?.fields || [];

  // Функция для фильтрации полей доставки
  const getDeliveryValues = (data: any) => {
    if (!data) return {};

    // Получаем список полей доставки

    // Фильтруем данные, оставляя только поля доставки
    return deliveryFields.reduce(
      (acc: any, field: any) => {
        acc[field] = data[field] || 0; // Используем 0 как значение по умолчанию
        return acc;
      },
      {} as Record<string, any>
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={!data ? 'Добавить запись' : 'Редактировать запись'}
      size={modalSize}
    >
      <Grid>
        <Grid.Col span={updatedFormColumns.delivery ? 6 : 12}>
          {/* Основная форма */}
          <UniversalForm
            columns={Object.entries(updatedFormColumns)
              .filter(([key]) => {
                // Исключаем сам блок delivery и все поля, которые относятся к доставке
                return key !== 'delivery' && !deliveryFields.includes(key);
              })
              .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})}
            defaultValues={data}
            onSubmit={handleSubmit}
            relationsData={relationsData}
          />
        </Grid.Col>

        {updatedFormColumns.delivery && (
          <Grid.Col span={6}>
            <DeliveryBlock
              value={getDeliveryValues(data)}
              onChange={(deliveryValues) => {
                const formElement = document.querySelector('form');
                if (formElement) {
                  Object.entries(deliveryValues).forEach(([key, value]) => {
                    const input = formElement.querySelector(`input[name="${key}"]`);
                    if (input) {
                      const event = new Event('input', { bubbles: true });
                      Object.defineProperty(event, 'target', { value: input });
                      input.dispatchEvent(event);
                    }
                  });
                }
              }}
              onSubmit={handleSubmit}
            />
          </Grid.Col>
        )}
      </Grid>
    </Modal>
  );
};
