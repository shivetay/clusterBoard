import FileList from '@/components/features/files/FileList';
import { FileUpload } from '@/components/features/files/FileUploads';
import { getProjectFilesAction } from '@/lib/actions';

export default async function FilesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const result = await getProjectFilesAction(id);

  const files = result.success ? result.data : undefined;

  return (
    <>
      <FileList files={files} />
      <FileUpload projectId={id} />
    </>
  );
}
