import { CLIENT_PAGE_TITLE } from '@/entities/client';
import { PageLayout } from '@/shared/ui';
import { ClientTable } from '@/widgets';

export const ClientsPage = () => {
  return (
    <PageLayout title={CLIENT_PAGE_TITLE}>
      <ClientTable />
    </PageLayout>
  );
};
