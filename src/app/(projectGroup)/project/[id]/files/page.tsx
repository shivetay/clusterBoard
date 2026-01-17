import { getProjectFilesAction } from '@/lib/actions';
import { FilesView } from '@/views';

type TFilesPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FilesPage({ params }: TFilesPageProps) {
  const { id } = await params;
  const result = await getProjectFilesAction(id);

  const files = result.success ? result.data : undefined;

  return <FilesView projectId={id} files={files} />;
}
