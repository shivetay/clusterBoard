'use client';
import {
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components/button';
import { TRANSLATIONS } from '@/locales';

export function StatusModal() {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleSubmit = () => {
    return;
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Stack>
      <FormGroup id="status-form" onSubmit={handleSubmit}>
        <RadioGroup
          name="status"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <FormControlLabel value="w-toku" control={<Radio />} label="W toku" />
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
      <CustomButton>{t(TRANSLATIONS.STATUS_CHANGE)}</CustomButton>
    </Stack>
  );
}

export default StatusModal;
