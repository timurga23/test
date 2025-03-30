import { BUYOUT_PAGE_TITLE } from '@/entities';
import { PageLayout } from '@/shared/ui';
import { BuyoutTable } from '@/widgets';

export const BuyoutsPage = () => {
  return (
    <PageLayout title={BUYOUT_PAGE_TITLE}>
      <BuyoutTable />
    </PageLayout>
  );
};
