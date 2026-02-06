import { getProjectInspirationsAction } from '@/lib/api/inspirations/inspirationClient';
import { InspirationView } from '@/views';

interface IInspirationsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InspirationsPage({
  params,
}: IInspirationsPageProps) {
  const { id } = await params;

  const inspirations = await getProjectInspirationsAction(id);

  return <InspirationView projectId={id} inspirations={inspirations.data} />;
}
