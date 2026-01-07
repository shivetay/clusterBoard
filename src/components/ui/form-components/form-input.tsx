'use client';
import { FormControl, Stack } from '@mui/material';
import { HelperText, InputField, Textarea } from './form-components.styled';
import { InputLabel } from './label';

export function FormInput({
  label,
  name,
  type,
  placeholder,
  helperText,
  error,
  defaultValue,
  ...rest
}: {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'date' | 'email';
  placeholder?: string;
  helperText?: string;
  error?: string;
  defaultValue?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof InputField>, 'error'>) {
  const hasError = !!error;

  return (
    <Stack width="100%">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <FormControl error={hasError}>
        {type === 'textarea' ? (
          <Textarea
            id={name}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            style={{ minHeight: '50px', width: '100%' }}
            {...(rest as React.ComponentPropsWithoutRef<'textarea'>)}
          />
        ) : (
          <InputField
            id={name}
            defaultValue={defaultValue}
            disableUnderline
            name={name}
            type={type}
            placeholder={placeholder}
            {...rest}
          />
        )}
      </FormControl>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Stack>
  );
}
