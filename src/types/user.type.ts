import type { IProjectData } from './project.type';
import type { IUserSubscription } from './subscription.type';

export interface IUserData {
  id: string;
  user_name: string;
  email: string;
  role: string;
  cluster_projects: Pick<IProjectData, 'id'>[];
  projects_limit: number;
  subscription?: IUserSubscription;
}
