'use client';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { InnerContainer, PageContainer } from '@/components';
import { FilesList, FileUpload } from '@/components/features';
import { TRANSLATIONS } from '@/locales';
import type { IFile } from '@/types';
import { BackButton } from '../project-invitations-view/project-invitation-view.styled';

type TFilesViewProps = {
  projectId: string;
  files?: IFile[];
};
export function FilesView({ projectId, files }: TFilesViewProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const handleBack = () => {
    router.push(`/project/${projectId}`);
  };
  return (
    <PageContainer>
      <BackButton color="primary" variant="contained" onClick={handleBack}>
        {t(TRANSLATIONS.BACK)}
      </BackButton>
      <InnerContainer pageTitle={TRANSLATIONS.FILES}>
        <FileUpload projectId={projectId} />
        <FilesList files={files} />
      </InnerContainer>
    </PageContainer>
  );
}

export default FilesView;
