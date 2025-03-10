import { EMPLOYEE_TABLE_NAME } from '@/enteties/employee/model/_constant';
import { Employee } from '@/enteties/employee/model/types';
import { useTableData } from '@/enteties/user-table/api/queries';
import { TableSort } from '@/shared/ui/table/table';
import { Flex, Text } from '@mantine/core';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

export const EmployersPage: FC = () => {
  const { data: employees, isLoading, isError } = useTableData<Employee>(EMPLOYEE_TABLE_NAME);

  useEffect(() => {
    if (isError) {
      toast.error('Ошибка при загрузке данных');
    }
  }, [isError]);

  const columns = [
    { key: 'last_name', label: 'Фамилия', sortable: true },
    { key: 'first_name', label: 'Имя', sortable: true },
    { key: 'middle_name', label: 'Отчество', sortable: true },
    { key: 'birth_date', label: 'Дата рождения', sortable: true },
    { key: 'phone', label: 'Телефон', sortable: true },
    { key: 'relevance', label: 'Активен', sortable: true },
  ];

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Flex direction="column" gap={16} p={16}>
      <Text size="h3">Таблица Сотрудников</Text>
      {employees && (
        <TableSort<Employee>
          data={employees}
          columns={columns}
          isSearchable
          onRowClick={(row) => {
            console.log('Clicked row:', row);
          }}
        />
      )}
    </Flex>
  );
};
