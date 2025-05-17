import {
  Employee,
  EMPLOYEE_COLUMNS,
  EMPLOYEE_FORM_COLUMNS,
  EMPLOYEE_POSITION,
  EMPLOYEE_TABLE_NAME,
  NormalizedEmployee,
  POSITION_TABLE_NAME,
} from '@/entities';
import { CrudTable } from '@/shared/ui';

export const EmployerTable = () => {
  const normalizeData = (
    employees: Employee[],
    relations: { employee_positions: any[]; position: any[] }
  ): NormalizedEmployee[] => {
    return employees.map((employee) => {
      const employeePositions = relations.employee_positions.filter(
        (ep) => ep.id_employee === employee.id_employee
      );
      const positionNames = employeePositions
        .map(
          (ep) => relations.position.find((pos) => pos.id_position === ep.id_position)?.name || ''
        )
        .join(', ');

      const positions = employeePositions.map((ep) => {
        const position = relations.position?.find((p) => p.id_position === ep.id_position);
        return {
          id_position: ep.id_position,
          name: position?.name || '',
        };
      });

      return {
        ...employee,
        fullName: `${employee.last_name} ${employee.first_name?.charAt(0)}. ${employee.middle_name?.charAt(0)}.`,
        position: positionNames,
        positions,
      };
    });
  };

  return (
    <CrudTable<NormalizedEmployee>
      tableName={EMPLOYEE_TABLE_NAME}
      columns={EMPLOYEE_COLUMNS}
      idField="id_employee"
      normalizeData={normalizeData}
      isSearchable
      formColumns={EMPLOYEE_FORM_COLUMNS}
      formRelations={{
        // @ts-ignore
        position: {
          tableName: POSITION_TABLE_NAME,
          valueField: 'id_position',
          labelField: 'name',
        },
        // @ts-ignore
        employee_positions: {
          tableName: EMPLOYEE_POSITION,
          valueField: 'id_employee',
          labelField: 'id_position',
        },
        // @ts-ignore
        id_employee_replacement: {
          tableName: EMPLOYEE_TABLE_NAME,
          valueField: 'id_employee',
          labelField: 'last_name',
        },
      }}
      relations={{
        // @ts-ignore
        position: {
          tableName: EMPLOYEE_POSITION,
          valueField: 'id_position',
          labelField: 'name',
        },
        // @ts-ignore
        employee_positions: {
          tableName: 'employee_positions',
          valueField: 'id_employee',
          labelField: 'id_position',
        },
      }}
    />
  );
};
