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
  ...rest
}: {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'date';
  placeholder?: string;
  helperText?: string;
} & React.ComponentPropsWithoutRef<typeof InputField>) {
  return (
    <Stack width="100%">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <FormControl>
        <InputField
          id={name}
          disableUnderline
          name={name}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      </FormControl>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Stack>
  );
}
