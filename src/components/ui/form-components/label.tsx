import { Label } from './form-components.styled';

export function InputLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <>
      <Label htmlFor={htmlFor}>{children}</Label>
    </>
  );
}

export default InputLabel;
