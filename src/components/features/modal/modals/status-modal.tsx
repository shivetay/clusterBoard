'use client';
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import { ModalButton } from '../modal.styled';

export function StatusModal() {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
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
        <ModalButton variant="contained" color="primary">
          {t(TRANSLATIONS.STATUS_CHANGE)}
        </ModalButton>
      </Box>
    </Stack>
  );
}

export default StatusModal;
