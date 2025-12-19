'use client';
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/ui';
import { useProjectStatusChange } from '@/lib/api/hooks/useProjectStatusChange';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import type { IProjectData } from '@/types';
import { ModalButton } from '../../modal.styled';

type TProjectStatus = 'zakończony' | 'w toku' | 'w przygotowaniu';
type TRadioValue = 'w-toku' | 'zakonczone' | 'w-przygotowaniu';

const radioToStatus: Record<TRadioValue, TProjectStatus> = {
  'w-toku': 'w toku',
  zakonczone: 'zakończony',
  'w-przygotowaniu': 'w przygotowaniu',
};

const statusToRadio: Record<TProjectStatus, TRadioValue> = {
  'w toku': 'w-toku',
  zakończony: 'zakonczone',
  'w przygotowaniu': 'w-przygotowaniu',
};

interface IStatusModalProps {
  projectData?: IProjectData;
}

export function StatusModal({ projectData }: IStatusModalProps) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();

  const initialRadioValue = useMemo<TRadioValue>(() => {
    if (projectData?.project_status) {
      return statusToRadio[projectData.project_status];
    }
    return 'w-przygotowaniu';
  }, [projectData?.project_status]);

  const [selectedRadioValue, setSelectedRadioValue] =
    useState<TRadioValue>(initialRadioValue);

  useEffect(() => {
    if (projectData?.project_status) {
      setSelectedRadioValue(statusToRadio[projectData.project_status]);
    }
  }, [projectData?.project_status]);

  const { changeStatus, isPending } = useProjectStatusChange(
    projectData?.id || '',
    t(TRANSLATIONS.PROJECT_EDITED_SUCCESSFULLY),
  );

  const handleSubmit = () => {
    const statusValue = radioToStatus[selectedRadioValue];
    changeStatus(statusValue);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value as TRadioValue);
  };

  return (
    <Stack>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <FormGroup id="status-form" onSubmit={handleSubmit}>
            <RadioGroup
              name="status"
              value={selectedRadioValue}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="w-toku"
                control={<Radio />}
                label="W toku"
              />
              <FormControlLabel
                value="zakonczone"
                control={<Radio />}
                label="Zakończony"
              />
              <FormControlLabel
                value="w-przygotowaniu"
                control={<Radio />}
                label="W przygotowaniu"
              />
            </RadioGroup>
          </FormGroup>
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            width="100%"
            marginTop="2rem"
          >
            <ModalButton
              onClick={() => setIsOpen(false)}
              variant="outlined"
              color="secondary"
            >
              {t(TRANSLATIONS.CANCEL)}
            </ModalButton>
            <ModalButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {t(TRANSLATIONS.STATUS_CHANGE)}
            </ModalButton>
          </Box>
        </>
      )}
    </Stack>
  );
}

export default StatusModal;
