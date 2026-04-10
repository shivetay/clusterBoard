import { getMySentProjectMessagesAction } from '@/lib/actions';
import { GlobalMessagesScreen } from '@/views/global-messages-view';

export default async function MessagesPage() {
  const result = await getMySentProjectMessagesAction();
  const messages = result.success ? result.data : [];

  return <GlobalMessagesScreen initialMessages={messages} />;
}
