import {
  EMPLOYEE_POSITION,
  EMPLOYEE_TABLE_NAME,
  Employee,
  EmployeePosition,
  POSITION_TABLE_NAME,
  Position,
  useTableData,
} from '@/enteties';
import { EmployerTable } from '@/widgets';
import { Flex, Loader, Text } from '@mantine/core';
import { FC } from 'react';

export const EmployersPage: FC = () => {
  const {
    data: employees,
    isError: isErrorEmployees,
    isLoading: isLoadingEmployees,
  } = useTableData<Employee>(EMPLOYEE_TABLE_NAME);
  const {
    data: positions,
    isError: isErrorPositions,
    isLoading: isLoadingPositions,
  } = useTableData<Position>(POSITION_TABLE_NAME);
  const {
    data: employeePositions,
    isError: isErrorEmployeePositions,
    isLoading: isLoadingEmployeePositions,
  } = useTableData<EmployeePosition>(EMPLOYEE_POSITION);

  // Добавим логирование для отслеживания обновлений
  console.log('Data updated:', { employees, positions, employeePositions });

  const isLoading = isLoadingEmployees || isLoadingPositions || isLoadingEmployeePositions;

  const isNullData = !employees || !positions || !employeePositions;

  if (isLoading || isNullData) {
    return (
      <Flex align="center" justify="center" h="100vh" w="100%">
        <Loader />
      </Flex>
    );
  }

  if (isErrorEmployees || isErrorPositions || isErrorEmployeePositions) {
    return <Text>Ошибка при загрузке данных</Text>;
  }

  return (
    <Flex direction="column" gap={16} p={16}>
      <Text size="h3">Таблица Сотрудников</Text>
      <EmployerTable
        employees={employees}
        positions={positions}
        employeePositions={employeePositions}
      />
    </Flex>
  );
};
