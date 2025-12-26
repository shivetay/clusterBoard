export interface IInvitationData {
  id?: string;

  project: {
    project_name?: string;
    owner: {
      owner_name: string;
    };
  };
  expires_at: string;
  updatedAt?: string;
}
