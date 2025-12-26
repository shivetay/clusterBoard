import type { IStageData } from './stage.type';

export interface IProjectData {
  id: string;
  project_name: string;
  project_description: string;
  start_date: string;
  end_date: string;
  investors: string[];
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
  project_stages: IStageData[];
}

export type TFormData = {
  project_name: string;
  project_description: string;
  owner: { owner_id: string; owner_name: string };
  start_date: string;
  end_date: string;
  project_stages?: IStageData[];
};
