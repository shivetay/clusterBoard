import type { IStageData } from './stage.type';

export interface IInvestorData {
  _id: string;
  clerk_id: string;
  user_name: string;
  id: string;
}

export type TProjectStatus = 'zakończony' | 'w toku' | 'w przygotowaniu';

export type TUserAccess = 'owner' | 'investor';

export interface IProjectData {
  id: string;
  project_name: string;
  project_description: string;
  start_date: string;
  end_date: string;
  investors: string[];
  project_status: TProjectStatus;
  project_stages: IStageData[];
  investors_name: IInvestorData[];
  user_access: TUserAccess;
  is_owner: boolean;
  is_investor: boolean;
  owner_name?: string;
}

export type TFormData = {
  project_name: string;
  project_description: string;
  owner: { owner_id: string; owner_name: string };
  start_date: string;
  end_date: string;
  project_stages?: IStageData[];
};
