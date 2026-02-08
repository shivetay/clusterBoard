'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  CustomButton,
  FileUpload,
  ImageGrid,
  InnerContainer,
} from '@/components';
import { PageContainer } from '@/components/layout/page-container';
import { TRANSLATIONS } from '@/locales';
import type { TInspiration } from '@/types';

type TInspirationViewProps = {
  projectId: string;
  inspirations?: TInspiration[];
};

export function InspirationView({
  projectId,
  inspirations,
}: TInspirationViewProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const handleBack = () => {
    router.push(`/project/${projectId}`);
  };

  const inspirationFiles = inspirations?.flatMap(
    (inspiration) => inspiration.files,
  );

  return (
    <PageContainer>
      <CustomButton
        sx={{ marginBottom: 2, marginLeft: 0 }}
        color="primary"
        variant="contained"
        onClick={handleBack}
      >
        {t(TRANSLATIONS.BACK)}
      </CustomButton>
      <InnerContainer pageTitle={TRANSLATIONS.INSPIRATION_TITLE}>
        <FileUpload projectId={projectId} isInspiration />
        <ImageGrid files={inspirationFiles} />
      </InnerContainer>
    </PageContainer>
  );
}

export default InspirationView;
