import { CORRECTION_PAGE_TITLE } from '@/entities';
import { PageLayout } from '@/shared/ui';
import { CorrectionTable } from '@/widgets/correction-table /ui/correction-table';

export const CorrectionPage = () => {
  return (
    <PageLayout title={CORRECTION_PAGE_TITLE}>
      <CorrectionTable />
    </PageLayout>
  );
};
