import { getProjectFilesAction } from '@/lib/actions';
import { FilesView } from '@/views';

export default async function FilesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const result = await getProjectFilesAction(id);

  const files = result.success ? result.data : undefined;

  return <FilesView projectId={id} files={files} />;
}
