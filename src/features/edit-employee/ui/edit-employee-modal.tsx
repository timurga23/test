import {
  Employee,
  EMPLOYEE_POSITION,
  EMPLOYEE_TABLE_NAME,
  EmployeePosition,
  Position,
  useAddTableData,
  useDeleteTableRow,
  useUpdateTableData,
} from '@/entities';
import { formatDateForServer, UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getEmployeeColumns } from '../lib/get-employee-columns';
import { normalizeFormData } from '../lib/normalize-form-data';
import { emptyEmployee } from '../model/_constant';

interface EditEmployeeModalProps {
  employee: Employee | null;
  employees: Employee[];
  positions: Position[];
  employeePositions: EmployeePosition[];
  isOpen: boolean;
  onClose: () => void;
}

export const EditEmployeeModal = ({
  employee,
  employees,
  positions,
  employeePositions,
  isOpen,
  onClose,
}: EditEmployeeModalProps) => {
  const { mutateAsync: updateMutation, isPending: isUpdating } = useUpdateTableData();
  const { mutateAsync: addMutation, isPending: isAdding } = useAddTableData();
  const { mutateAsync: deleteMutation, isPending: isDeleting } = useDeleteTableRow();

  const queryClient = useQueryClient();

  const isNewEmployee = !employee;

  const columns = getEmployeeColumns(employees, positions, employee || ({} as Employee));

  const defaultValues = isNewEmployee
    ? emptyEmployee
    : {
        ...employee,
        ...positions.reduce(
          (acc, position) => ({
            ...acc,
            [`position_${position.id_position}`]: employeePositions.some(
              (ep) =>
                ep.id_position === position.id_position && ep.id_employee === employee.id_employee
            ),
          }),
          {}
        ),
      };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (isNewEmployee) {
        // Для нового сотрудника добавляем полный формат даты с временем
        const formattedValues = {
          ...values,
          birth_date: formatDateForServer(values.birth_date),
        };

        await addMutation({
          tableName: EMPLOYEE_TABLE_NAME,
          data: [
            {
              // @ts-ignore
              row: Object.entries(formattedValues)
                .filter(([key]) => !key.startsWith('position_'))
                .map(([column, value]) => ({
                  column,
                  value,
                })),
            },
          ],
        });

        // Добавляем позиции если они выбраны
        const selectedPositions = Object.entries(values)
          .filter(([key, value]) => key.startsWith('position_') && value === true)
          .map(([key]) => key.replace('position_', ''));

        if (selectedPositions.length > 0) {
          // Здесь нужно получить id созданного сотрудника и добавить позиции
          // Возможно потребуется дополнительный запрос или модификация API
        }
      } else {
        // Существующая логика обновления
        const operations = normalizeFormData(values, employee, employeePositions);
        // Последовательно выполняем все операции
        for (const operation of operations) {
          if (operation.update) {
            await updateMutation({
              tableName: operation.update.tableName,
              data: operation.update.data,
            });
          }

          if (operation.add) {
            await addMutation({
              tableName: operation.add.tableName,
              data: operation.add.data,
            });
          }

          if (operation.delete) {
            await deleteMutation({
              tableName: operation.delete.tableName,
              data: operation.delete.data,
            });
          }
        }
      }

      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Ошибка при сохранении данных');
    }

    await queryClient.invalidateQueries({ queryKey: ['table', EMPLOYEE_TABLE_NAME] });
    await queryClient.invalidateQueries({ queryKey: ['table', EMPLOYEE_POSITION] });
  };

  const isLoading = isUpdating || isAdding || isDeleting;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={isNewEmployee ? 'Добавление сотрудника' : 'Редактирование сотрудника'}
    >
      <UniversalForm
        // @ts-ignore
        columns={columns}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
};
