import { EmployeePosition, Position } from '@/enteties';
import { Employee } from '../model/types';

export interface NormalizedEmployee extends Employee {
  fullName: string;
  position: string;
  birth_date: string | null;
}

export const mapEmployeeData = (employee: Employee): string => {
  const middleInitial = employee.middle_name ? ` ${employee.middle_name.charAt(0)}.` : '';
  const firstInitial = employee.first_name ? ` ${employee.first_name.charAt(0)}.` : '';

  return `${employee.last_name}${firstInitial}${middleInitial}`;
};

export const mapEmployeePosition = (
  positions: Position[],
  employeeId: string,
  employeePositions: EmployeePosition[]
): string => {
  const employeePositionIds = employeePositions
    .filter((pos) => pos.id_employee === employeeId)
    .map((pos) => pos.id_position);

  const positionNames = positions
    .filter((pos) => employeePositionIds.includes(pos.id_position))
    .map((pos) => pos.name);

  return positionNames.length > 0 ? positionNames.join(', ') : '-';
};

export const mapEmployeeToTable = (
  employees: Employee[],
  positions: Position[],
  employeePositions: EmployeePosition[]
): NormalizedEmployee[] => {
  return employees.map((employee) => ({
    ...employee,
    fullName: mapEmployeeData(employee),
    position: mapEmployeePosition(positions, employee.id_employee, employeePositions),
  }));
};
