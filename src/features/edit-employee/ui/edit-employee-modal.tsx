import {
  Employee,
  EMPLOYEE_POSITION,
  EMPLOYEE_TABLE_NAME,
  EmployeePosition,
  Position,
  useAddTableData,
  useDeleteTableRow,
  useUpdateTableData,
} from '@/enteties';
import { UniversalForm } from '@/shared';
import { Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getEmployeeColumns } from '../lib/get-employee-columns';
import { normalizeFormData } from '../lib/normalize-form-data';

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
  if (!employee) return null;

  const { mutateAsync: updateMutation, isPending: isUpdating } = useUpdateTableData();
  const { mutateAsync: addMutation, isPending: isAdding } = useAddTableData();
  const { mutateAsync: deleteMutation, isPending: isDeleting } = useDeleteTableRow();

  const queryClient = useQueryClient();

  const columns = getEmployeeColumns(employees, positions, employee);

  // Подготавливаем начальные значения, включая позиции
  const defaultValues = {
    ...employee,
    ...positions.reduce(
      (acc, position) => ({
        ...acc,
        [`position_${position.id_position}`]: employeePositions.some(
          (ep) => ep.id_position === position.id_position && ep.id_employee === employee.id_employee
        ),
      }),
      {}
    ),
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const operations = normalizeFormData(
        values,
        employee,
        employeePositions.filter((ep) => ep.id_employee === employee.id_employee)
      );

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

      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error(`Ошибка при обновлении данных в таблице попробуйте позже`);
    }
      queryClient.invalidateQueries({ queryKey: ['table', EMPLOYEE_POSITION] });
      queryClient.invalidateQueries({ queryKey: ['table', EMPLOYEE_TABLE_NAME] });
  };

  const isLoading = isUpdating || isAdding || isDeleting;

  return (
    <Modal opened={isOpen} onClose={onClose} title="Редактирование сотрудника">
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
