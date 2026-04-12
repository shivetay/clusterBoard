'use client';
import { Box } from '@mui/material';
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
import { TRANSLATIONS } from '@/locales';
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
