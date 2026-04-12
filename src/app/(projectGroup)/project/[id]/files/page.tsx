import { Suspense } from 'react';
import { Loader } from '@/components';
import { getProjectFilesAction } from '@/lib/actions';
import {
  emptyPaginationMeta,
  itemsPerPageForFilesView,
  parseFilesViewMode,
} from '@/lib/pagination/constants';
import { FilesView } from '@/views';

type TFilesPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    view?: string;
  }>;
};

export default async function FilesPage({
  params,
  searchParams,
}: TFilesPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const viewMode = parseFilesViewMode(query.view);
  const currentPage = Math.max(1, Number.parseInt(query.page || '1', 10) || 1);
  const itemsPerPage = itemsPerPageForFilesView(viewMode);

  const result = await getProjectFilesAction(id, {
    currentPage,
    itemsPerPage,
  });

  const files = result.success ? result.data : undefined;
  const pagination = result.success ? result.pagination : emptyPaginationMeta;

  return (
    <Suspense fallback={<Loader />}>
      <FilesView
        projectId={id}
        files={files}
        pagination={pagination}
        viewMode={viewMode}
      />
    </Suspense>
  );
}
