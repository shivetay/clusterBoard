'use client';

import { Box, Typography } from '@mui/material';
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
import { formatSubscriptionLimit } from '@/lib/utils';
import { TRANSLATIONS } from '@/locales';
import { useUser } from '@/stores';
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
  const { userInfo } = useUser();
  const sub = userInfo?.subscription;
  const inspirationsLine = sub
    ? formatSubscriptionLimit(
        sub.usage?.inspirations_used ?? 0,
        sub.limits?.max_inspirations ?? null,
      )
    : null;
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
        {inspirationsLine ? (
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            {t(TRANSLATIONS.SUBSCRIPTION_INSPIRATIONS_LABEL)}:{' '}
            {inspirationsLine}
          </Typography>
        ) : null}
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
