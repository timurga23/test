import { OPERATION_SAFE_PAGE_TITLE } from '@/entities';
import { PageLayout } from '@/shared/ui';
import { OperationSafeTable } from '@/widgets';

export const OperationSafePage = () => {
  return (
    <PageLayout title={OPERATION_SAFE_PAGE_TITLE}>
      <OperationSafeTable />
    </PageLayout>
  );
};
