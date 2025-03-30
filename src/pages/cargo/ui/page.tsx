import { CARGO_PAGE_TITLE } from '@/entities';
import { PageLayout } from '@/shared/ui';
import { CargoTable } from '@/widgets';

export const CargosPage = () => {
  return (
    <PageLayout title={CARGO_PAGE_TITLE}>
      <CargoTable />
    </PageLayout>
  );
};
