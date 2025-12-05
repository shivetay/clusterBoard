export interface IProjectData {
  id: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  investors: string[];
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
  project_stages: IProjectStage[];
}

export type TFormData = {
  project_name: string;
  project_description: string;
  owner: string;
  start_date: string;
  end_date: string;
  project_stages: IProjectStage[];
};

export interface IProjectStage {
  stage_name: string;
  stage_description: string;
  stage_tasks?: IStageTask[];
}

export interface IStageTask {
  task_name: string;
  is_done: boolean;
}
