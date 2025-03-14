import {
  POSITION_COLUMNS,
  POSITION_FORM_COLUMNS,
  POSITION_ID_FIELD,
  POSITION_PAGE_TITLE,
  POSITION_TABLE_NAME,
  type Position,
} from '@/entities';
import { CrudTable, PageLayout } from '@/shared/ui';

export const PositionsPage = () => {
  return (
    <PageLayout title={POSITION_PAGE_TITLE}>
      <CrudTable<Position>
        tableName={POSITION_TABLE_NAME}
        columns={POSITION_COLUMNS}
        formColumns={POSITION_FORM_COLUMNS}
        idField={POSITION_ID_FIELD}
        showAddButton={false}
      />
    </PageLayout>
  );
};
