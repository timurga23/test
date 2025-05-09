import {
  EMPLOYEE_PAGE_DESCRIPTION,
  EMPLOYEE_POSITION,
  EMPLOYEE_TABLE_NAME,
  Employee,
  EmployeePosition,
  POSITION_TABLE_NAME,
  Position,
  useTableData,
} from '@/entities';
import { PageLayout } from '@/shared/ui';
import { EmployerTable } from '@/widgets';
import { Flex, Loader, Text } from '@mantine/core';
import { FC } from 'react';

export const EmployersPage: FC = () => {
  return (
    <PageLayout title={EMPLOYEE_PAGE_DESCRIPTION}>
      <EmployerTable />
    </PageLayout>
  );
};
