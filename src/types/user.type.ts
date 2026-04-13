import type { IProjectData } from './project.type';
import type { IUserSubscription } from './subscription.type';

export interface IUserData {
  id: string;
  user_name: string;
  email: string;
  role: string;
  cluster_projects: Pick<IProjectData, 'id'>[];
  /** Mirrors backend plan; `null` = unlimited project cap. */
  projects_limit: number | null;
  subscription?: IUserSubscription;
}
