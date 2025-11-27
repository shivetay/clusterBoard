'use client';
import { FormControl, Stack } from '@mui/material';
import { HelperText, InputField } from './form-components.styled';
import { InputLabel } from './label';

export function FormInput({
  label,
  name,
  type,
  placeholder,
  helperText,
}: {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'date';
  placeholder?: string;
  helperText?: string;
}) {
  return (
    <Stack width="100%">
      <InputLabel>{label}</InputLabel>
      <FormControl>
        <InputField
          disableUnderline
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </FormControl>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Stack>
  );
}
