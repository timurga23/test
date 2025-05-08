import { OPERATION_CARD_PAGE_TITLE } from '@/entities';
import { PageLayout } from '@/shared/ui';
import { OperationCardTable } from '@/widgets';

export const OperationCardsPage = () => {
  return (
    <PageLayout title={OPERATION_CARD_PAGE_TITLE}>
      <OperationCardTable />
    </PageLayout>
  );
};
