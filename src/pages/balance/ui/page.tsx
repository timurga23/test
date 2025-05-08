import type { Balance } from '@/entities';
import {
  BALANCE_COLUMNS,
  BALANCE_FORM_COLUMNS,
  BALANCE_ID_FIELD,
  BALANCE_PAGE_TITLE,
  BALANCE_TABLE_NAME,
} from '@/entities';
import { CrudTable, PageLayout } from '@/shared/ui';

export const BalancePage = () => {
  return (
    <PageLayout title={BALANCE_PAGE_TITLE}>
      <CrudTable<Balance>
        tableName={BALANCE_TABLE_NAME}
        columns={BALANCE_COLUMNS}
        formColumns={BALANCE_FORM_COLUMNS}
        idField={BALANCE_ID_FIELD}
        isSearchable={false}
      />
    </PageLayout>
  );
};
