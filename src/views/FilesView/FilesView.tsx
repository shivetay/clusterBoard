'use client';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  CollectionPagination,
  CustomButton,
  FilesGrid,
  FilesList,
  FileUpload,
  InnerContainer,
  ListGridViewToggle,
  PageContainer,
} from '@/components';
import type { FilesViewMode } from '@/lib/pagination/constants';
import { formatSubscriptionLimit } from '@/lib/utils';
import { TRANSLATIONS } from '@/locales';
import { useUser } from '@/stores';
import type { IFile, PaginationMeta } from '@/types';

type TFilesViewProps = {
  projectId: string;
  files?: IFile[];
  pagination: PaginationMeta;
  viewMode: FilesViewMode;
};

export function FilesView({
  projectId,
  files,
  pagination,
  viewMode,
}: TFilesViewProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const sub = userInfo?.subscription;
  const filesLine =
    sub?.limits?.max_files != null
      ? formatSubscriptionLimit(sub.usage.files_used, sub.limits.max_files)
      : null;
  const handleBack = () => {
    router.push(`/project/${projectId}`);
  };

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
      <InnerContainer pageTitle={TRANSLATIONS.FILES}>
        {filesLine ? (
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            {t(TRANSLATIONS.SUBSCRIPTION_FILES_LABEL)}: {filesLine}
          </Typography>
        ) : null}
        <FileUpload projectId={projectId} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListGridViewToggle viewMode={viewMode} />
          {viewMode === 'grid' ? (
            <FilesGrid files={files} />
          ) : (
            <FilesList files={files} />
          )}
          <CollectionPagination pagination={pagination} />
        </Box>
      </InnerContainer>
    </PageContainer>
  );
}

export default FilesView;
