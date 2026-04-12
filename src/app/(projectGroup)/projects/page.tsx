import { Suspense } from 'react';
import { Loader } from '@/components';
import { ProjectsView } from '@/views';

export default function ProjectsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ProjectsView />
    </Suspense>
  );
}
