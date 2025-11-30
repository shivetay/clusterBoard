export interface IProjectData {
  id: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  investors: string[];
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
}

export type TFormData = {
  project_name: string;
  project_description: string;
  owner: string;
  start_date: string;
  end_date: string;
};
