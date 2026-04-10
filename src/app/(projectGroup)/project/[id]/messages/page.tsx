import { getProjectMessagesAction } from '@/lib/actions';
import { MessagesView } from '@/views';

type TMessagesPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MessagesPage({ params }: TMessagesPageProps) {
  const { id } = await params;
  const result = await getProjectMessagesAction(id);
  const messages = result.success ? result.data : [];

  return <MessagesView projectId={id} messages={messages} />;
}
