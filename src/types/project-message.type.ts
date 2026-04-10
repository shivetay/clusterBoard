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

/** Current user's sent messages across projects (flat; replies []). */
export type TMySentProjectMessage = TPublicProjectMessage & {
  project_id: string;
  project_name: string;
  parent_author_name: string | null;
};

export type TProjectMessagesListResponse = {
  status: string;
  results: number;
  data: { messages: TPublicProjectMessage[] };
};

export type TMySentProjectMessagesListResponse = {
  status: string;
  results: number;
  data: { messages: TMySentProjectMessage[] };
};
