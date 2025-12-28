export interface IInvitationData {
  id?: string;
  _id?: string;
  project: {
    project_name?: string;
    owner: {
      owner_name: string;
    };
  };
  expires_at: string;
  updatedAt?: string;
  createdAt?: string;
  accepted_at?: string;
  status?: 'pending' | 'accepted' | 'expired' | 'cancelled';
  email?: string;
  invitee_email?: string;
  recipient_name?: string;
  inviter_name?: string;
  inviter?: {
    user_name?: string;
  };
  user?: {
    name?: string;
  };
}
