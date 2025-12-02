'use client';
import { Radio } from '@mui/material';
import { useState } from 'react';
import { StageTaskContainer, TaskRadio } from './stage-task.styled';

export function StageTaskComponent() {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <StageTaskContainer>
      <TaskRadio
        control={<Radio checked={checked} onClick={handleToggle} />}
        label="Task"
      />
    </StageTaskContainer>
  );
}
export default StageTaskComponent;
