'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  CollectionPagination,
  CustomButton,
  FileUpload,
  ImageGrid,
  InnerContainer,
  InspirationEntriesList,
  ListGridViewToggle,
} from '@/components';
import { PageContainer } from '@/components/layout/page-container';
import type { FilesViewMode } from '@/lib/pagination/constants';
import { TRANSLATIONS } from '@/locales';
import type { PaginationMeta, TInspirationItem } from '@/types';

type TInspirationViewProps = {
  projectId: string;
  inspirationItems?: TInspirationItem[];
  pagination: PaginationMeta;
  viewMode: FilesViewMode;
};

export function InspirationView({
  projectId,
  inspirationItems,
  pagination,
  viewMode,
}: TInspirationViewProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const handleBack = () => {
    router.push(`/project/${projectId}`);
  };

  const inspirationFiles = inspirationItems?.map((row) => row.file);

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListGridViewToggle viewMode={viewMode} />
          {viewMode === 'grid' ? (
            <ImageGrid files={inspirationFiles} />
          ) : (
            <InspirationEntriesList entries={inspirationItems} />
          )}
          <CollectionPagination pagination={pagination} />
        </Box>
      </InnerContainer>
    </PageContainer>
  );
}

export default InspirationView;
