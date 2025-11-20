import { Form } from './form.styled';

type TFormComponentProps = {
  children: React.ReactNode;
  formId: string;
  onSubmit: (data: any) => void;
};

export function FormComponent({
  children,
  formId,
  onSubmit,
}: TFormComponentProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
