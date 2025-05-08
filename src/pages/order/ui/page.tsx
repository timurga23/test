import { ORDER_PAGE_TITLE } from '@/entities';
import { PageLayout } from '@/shared/ui';
import { OrderTable } from '@/widgets';

export const OrdersPage = () => {
  return (
    <PageLayout title={ORDER_PAGE_TITLE}>
      <OrderTable />
    </PageLayout>
  );
};
