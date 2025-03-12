import { EMPLOYEE_POSITION, EmployeePosition } from '@/enteties';
import { TableRowAdd, TableUpdates } from '@/enteties/user-table/model/types';
import { IColumn } from '@/shared';

interface TableOperation {
  update?: {
    tableName: string;
    data: TableUpdates;
  };
  add?: {
    tableName: string;
    data: TableRowAdd[];
  };
  delete?: {
    tableName: string;
    data: IColumn[];
  };
}

export const normalizeFormData = (
  formData: Record<string, any>,
  originalEmployee: Record<string, any>,
  currentPositions: EmployeePosition[]
): TableOperation[] => {
  const operations: TableOperation[] = [];

  // Обновление данных сотрудника
  const employeeChanges = Object.entries(formData).filter(
    ([key, value]) => !key.startsWith('position_') && value !== originalEmployee[key]
  );

  if (employeeChanges.length > 0) {
    operations.push({
      update: {
        tableName: 'employee',
        data: [
          {
            filter: [{ column: 'id_employee', value: originalEmployee.id_employee }],
            row: employeeChanges.map(([column, value]) => ({
              column,
              value,
            })),
          },
        ],
      },
    });
  }

  // Обработка позиций
  const selectedPositions = new Set(
    Object.entries(formData)
      .filter(([key, value]) => key.startsWith('position_') && value === true)
      .map(([key]) => key.replace('position_', ''))
  );

  const currentPositionIds = new Set(currentPositions.map((pos) => pos.id_position));

  // Позиции для добавления
  const positionsToAdd = Array.from(selectedPositions)
    .filter((posId) => !currentPositionIds.has(posId))
    .map((posId) => ({
      row: [
        { column: 'id_employee', value: originalEmployee.id_employee },
        { column: 'id_position', value: posId },
      ],
    }));

  // Позиции для удаления
  const positionsToDelete = currentPositions
    .filter((pos) => !selectedPositions.has(String(pos.id_position)))
    .map((pos) => [
      { column: 'id_employee', value: pos.id_employee },
      { column: 'id_position', value: pos.id_position },
    ])
    .flat();

  if (positionsToAdd.length > 0) {
    operations.push({
      add: {
        tableName: EMPLOYEE_POSITION,
        data: positionsToAdd as unknown as TableRowAdd[],
      },
    });
  }

  if (positionsToDelete.length > 0) {
    operations.push({
      delete: {
        tableName: EMPLOYEE_POSITION,
        data: positionsToDelete as IColumn[],
      },
    });
  }

  return operations;
};
