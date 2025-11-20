import type { FormEvent, ReactNode } from 'react';
import { Form } from './form.styled';

type TFormComponentProps = {
  children: ReactNode;
  formId: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function FormComponent({
  children,
  formId,
  onSubmit,
}: TFormComponentProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      {children}
    </Form>
  );
}

export default FormComponent;
