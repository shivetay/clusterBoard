import { Suspense } from 'react';
import { Loader } from '@/components';
import { getProjectInspirationsAction } from '@/lib/api/inspirations/inspirationClient';
import {
  itemsPerPageForInspirationView,
  parseFilesViewMode,
} from '@/lib/pagination/constants';
import { InspirationView } from '@/views';

interface IInspirationsPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    view?: string;
  }>;
}

export default async function InspirationsPage({
  params,
  searchParams,
}: IInspirationsPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const viewMode = parseFilesViewMode(query.view);
  const currentPage = Math.max(1, Number.parseInt(query.page || '1', 10) || 1);
  const itemsPerPage = itemsPerPageForInspirationView(viewMode);

  const result = await getProjectInspirationsAction(id, {
    currentPage,
    itemsPerPage,
  });

  return (
    <Suspense fallback={<Loader />}>
      <InspirationView
        projectId={id}
        inspirationItems={result.data}
        pagination={result.pagination}
        viewMode={viewMode}
      />
    </Suspense>
  );
}
