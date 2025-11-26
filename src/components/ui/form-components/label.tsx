import { Label } from './form-components.styled';

export function InputLabel({ children }: { children: React.ReactNode }) {
  return <Label>{children}</Label>;
}

export default InputLabel;
