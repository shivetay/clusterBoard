import type { TCommentType } from './comment.type';

export type TStageFormData = {
  stage_name?: string;
  stage_description?: string;
  is_done?: boolean;
};

export interface IStageData {
  id: string;
  stage_name: string;
  stage_description: string;
  stage_tasks: IStageTask[];
  is_done: boolean;
}

export interface IStageTask {
  id: string;
  stage_id: string;
  task_name: string;
  is_done: boolean;
  task_comments: TCommentType[];
}
