import { Form } from './form.styled';

type TFormSubmitHandler = NonNullable<React.ComponentProps<'form'>['onSubmit']>;

type TFormComponentProps = {
  children: React.ReactNode;
  formId: string;
  onSubmit: TFormSubmitHandler;
};

export function FormComponent({
  children,
  formId,
  onSubmit,
}: TFormComponentProps) {
  const handleSubmit: TFormSubmitHandler = (event) => {
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
