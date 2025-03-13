import {
  Employee,
  EMPLOYEE_COLUMNS,
  EmployeePosition,
  mapEmployeeToTable,
  NormalizedEmployee,
  Position,
} from '@/entities';
import { EditEmployeeModal } from '@/features';
import { TableSort } from '@/shared/ui';
import { ActionIcon, Box, Button, Flex } from '@mantine/core';
import { IconFilter, IconPlus } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { FilterPanel } from './filter-panel';

type TProps = {
  employees: Employee[];
  positions: Position[];
  employeePositions: EmployeePosition[];
};

interface Filters {
  positions: string[];
  relevance: boolean | null;
}

export const EmployerTable = ({ employees, positions, employeePositions }: TProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    positions: [],
    relevance: null,
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const filteredData = useMemo(() => {
    let result = [...employees];

    // Фильтрация по должностям
    if (filters.positions.length > 0) {
      result = result.filter((employee) => {
        const employeePositionIds = employeePositions
          .filter((ep) => ep.id_employee === employee.id_employee)
          .map((ep) => ep.id_position);

        return filters.positions.some((posId) => employeePositionIds.includes(posId));
      });
    }

    // Фильтрация по активности
    if (filters.relevance !== null) {
      result = result.filter((employee) => employee.relevance === filters.relevance);
    }

    return result;
  }, [employees, employeePositions, filters]);

  console.log(112, filteredData);

  const normalizedData = useMemo(() => {
    return mapEmployeeToTable(filteredData, positions, employeePositions);
  }, [filteredData, positions, employeePositions]);

  return (
    <Flex gap={16}>
      {isFilterOpen && (
        <Box
          style={{
            borderRight: '1px solid var(--mantine-color-gray-3)',
            minWidth: '250px',
          }}
        >
          <FilterPanel
            positions={positions}
            currentFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>
      )}

      <Box style={{ flex: 1 }}>
        <Flex justify="space-between" align="center" mb="md">
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              setSelectedEmployee(null);
              setIsModalOpen(true);
            }}
          >
            Добавить сотрудника
          </Button>

          <ActionIcon
            variant="subtle"
            color={isFilterOpen ? 'blue' : 'gray'}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            title="Фильтры"
          >
            <IconFilter size={20} />
          </ActionIcon>
        </Flex>

        <TableSort<NormalizedEmployee>
          key={JSON.stringify(normalizedData)}
          data={normalizedData}
          columns={EMPLOYEE_COLUMNS}
          isSearchable
          onRowClick={(row) => {
            setSelectedEmployee(row);
            setIsModalOpen(true);
          }}
        />
      </Box>

      <EditEmployeeModal
        employee={selectedEmployee}
        employees={employees}
        positions={positions}
        employeePositions={employeePositions}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
      />
    </Flex>
  );
};
