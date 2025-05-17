import {
  Balance,
  BALANCE_COLUMNS,
  BALANCE_FORM_COLUMNS,
  BALANCE_ID_FIELD,
  BALANCE_PAGE_TITLE,
  BALANCE_TABLE_NAME,
  BUYOUT_PAGE_TITLE,
  CARGO_PAGE_TITLE,
  CLIENT_PAGE_TITLE,
  CORRECTION_PAGE_TITLE,
  EMPLOYEE_PAGE_DESCRIPTION,
  NormalizedRate,
  OPERATION_CARD_PAGE_TITLE,
  OPERATION_SAFE_PAGE_TITLE,
  ORDER_PAGE_TITLE,
  POSITION_PAGE_TITLE,
  Rate,
  RATE_COLUMNS,
  RATE_FORM_COLUMNS,
  RATE_ID_FIELD,
  RATE_TABLE_NAME,
  TORG12_PAGE_TITLE,
} from '@/entities';

import { CrudTable } from '@/shared/ui';

import { Position, POSITION_TABLE_NAME } from '@/entities';

import { POSITION_COLUMNS, POSITION_FORM_COLUMNS } from '@/entities';

import { POSITION_ID_FIELD } from '@/entities';
import { PageLayout } from '@/shared/ui';
import {
  BuyoutTable,
  CardTable,
  CargoTable,
  ClientTable,
  EmployerTable,
  LoginModal,
  OperationCardTable,
  OperationSafeTable,
  OrderTable,
  Torg12Table,
} from '@/widgets';
import { AnalyticsCardBalanceTable } from '@/widgets/analytic-card/ui/analytic-card-table';
import { CorrectionTable } from '@/widgets/correction-table /ui/correction-table';

export const BASE_PAGES = [
  {
    path: '/positions',
    element: (
      <PageLayout title={POSITION_PAGE_TITLE}>
        <CrudTable<Position>
          tableName={POSITION_TABLE_NAME}
          columns={POSITION_COLUMNS}
          formColumns={POSITION_FORM_COLUMNS}
          idField={POSITION_ID_FIELD}
          isShowAddButton={false}
          isSearchable={false}
        />
      </PageLayout>
    ),
  },
  {
    path: '/employers',
    element: (
      <PageLayout title={EMPLOYEE_PAGE_DESCRIPTION}>
        <EmployerTable />
      </PageLayout>
    ),
  },
  {
    path: '/login',
    element: <LoginModal />,
  },
  {
    path: '/cards',
    element: (
      <PageLayout title={'Карты'}>
        <CardTable />
      </PageLayout>
    ),
  },
  {
    path: '/balance',
    element: (
      <PageLayout title={'Баланс'}>
        <PageLayout title={BALANCE_PAGE_TITLE}>
          <CrudTable<Balance>
            tableName={BALANCE_TABLE_NAME}
            columns={BALANCE_COLUMNS}
            formColumns={BALANCE_FORM_COLUMNS}
            idField={BALANCE_ID_FIELD}
            isSearchable={false}
            autoNumberFields={['numb_balance']}
          />
        </PageLayout>
      </PageLayout>
    ),
  },
  {
    path: '/rate',
    element: (
      <PageLayout>
        <CrudTable<Rate, NormalizedRate>
          tableName={RATE_TABLE_NAME}
          columns={RATE_COLUMNS}
          formColumns={RATE_FORM_COLUMNS}
          idField={RATE_ID_FIELD}
          isShowAddButton={false}
          isSearchable={false}
        />
      </PageLayout>
    ),
  },
  {
    path: '/operation-cards',
    element: (
      <PageLayout title={OPERATION_CARD_PAGE_TITLE}>
        <OperationCardTable />
      </PageLayout>
    ),
  },
  {
    path: '/clients',
    element: (
      <PageLayout title={CLIENT_PAGE_TITLE}>
        <ClientTable />
      </PageLayout>
    ),
  },
  {
    path: '/orders',
    element: (
      <PageLayout title={ORDER_PAGE_TITLE}>
        <OrderTable />
      </PageLayout>
    ),
  },
  {
    path: '/cargos',
    element: (
      <PageLayout title={CARGO_PAGE_TITLE}>
        <CargoTable />
      </PageLayout>
    ),
  },
  {
    path: '/buyouts',
    element: (
      <PageLayout title={BUYOUT_PAGE_TITLE}>
        <BuyoutTable />
      </PageLayout>
    ),
  },
  {
    path: '/torg12s',
    element: (
      <PageLayout title={TORG12_PAGE_TITLE}>
        <Torg12Table />
      </PageLayout>
    ),
  },
  {
    path: '/corrections',
    element: (
      <PageLayout title={CORRECTION_PAGE_TITLE}>
        <CorrectionTable />
      </PageLayout>
    ),
  },
  {
    path: '/operation-safes',
    element: (
      <PageLayout title={OPERATION_SAFE_PAGE_TITLE}>
        <OperationSafeTable />
      </PageLayout>
    ),
  },
  {
    path: '/analytics-card-balance',
    element: (
      <PageLayout title={'Отчет по картам'}>
        <AnalyticsCardBalanceTable />
      </PageLayout>
    ),
  },
];
