import {
  Employee,
  EMPLOYEE_COLUMNS,
  EmployeePosition,
  mapEmployeeToTable,
  NormalizedEmployee,
  Position,
} from '@/enteties';
import { EditEmployeeModal } from '@/features';
import { TableSort } from '@/shared';
import { useMemo, useState } from 'react';

type TProps = {
  employees: Employee[];
  positions: Position[];
  employeePositions: EmployeePosition[];
};

export const EmployerTable = ({ employees, positions, employeePositions }: TProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedData = useMemo(() => {
    return mapEmployeeToTable(employees, positions, employeePositions);
  }, [employees, positions, employeePositions]);

  const handleRowClick = (row: NormalizedEmployee) => {
    const employee = employees.find((emp) => emp.id_employee === row.id_employee);
    if (employee) {
      setSelectedEmployee(employee);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <TableSort<NormalizedEmployee>
        key={JSON.stringify(normalizedData)}
        data={normalizedData}
        columns={EMPLOYEE_COLUMNS}
        isSearchable
        onRowClick={handleRowClick}
      />
      <EditEmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employees={employees}
        positions={positions}
        employeePositions={employeePositions}
      />
    </>
  );
};
