import {
  NormalizedRate,
  Rate,
  RATE_COLUMNS,
  RATE_FORM_COLUMNS,
  RATE_ID_FIELD,
  RATE_TABLE_NAME,
} from '@/entities';
import { CrudTable, PageLayout } from '@/shared/ui';

export const RatePage = () => {
  return (
    <PageLayout>
      <CrudTable<Rate, NormalizedRate>
        tableName={RATE_TABLE_NAME}
        columns={RATE_COLUMNS}
        formColumns={RATE_FORM_COLUMNS}
        idField={RATE_ID_FIELD}
        showAddButton={false}
        isSearchable={false}
      />
    </PageLayout>
  );
};
