'use client';
import { Radio } from '@mui/material';
import { useState } from 'react';
import type { IStageTask } from '@/types';
import { StageTaskContainer, TaskRadio } from './stage-task.styled';

interface IStageTaskComponentProps {
  stage_tasks: IStageTask[];
}

export function StageTaskComponent({ stage_tasks }: IStageTaskComponentProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const handleToggle = (taskName: string) => {
    setSelectedTask((prev) => (prev === taskName ? null : taskName));
  };

  return (
    <StageTaskContainer>
      {stage_tasks.map((task) => (
        <TaskRadio
          key={task.id}
          control={
            <Radio
              checked={selectedTask === task.task_name}
              onClick={() => handleToggle(task.task_name)}
            />
          }
          label={task.task_name}
        />
      ))}
    </StageTaskContainer>
  );
}
export default StageTaskComponent;
