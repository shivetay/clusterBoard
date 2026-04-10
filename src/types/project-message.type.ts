export type TPublicProjectMessage = {
  id: string;
  author_id: string;
  author_name: string;
  body: string;
  is_edited: boolean;
  parent_message_id: string | null;
  created_at: string;
  updated_at: string;
  replies: TPublicProjectMessage[];
};

export type TProjectMessagesListResponse = {
  status: string;
  results: number;
  data: { messages: TPublicProjectMessage[] };
};
