import type { IProjectData } from './project.type';

export interface IUserData {
  id: string;
  name: string;
  email: string;
  role: string;
  cluster_projects: Pick<IProjectData, 'id'>[];
  projects_limit: number;
}
