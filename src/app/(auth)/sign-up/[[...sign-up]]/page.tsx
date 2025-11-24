import { SignUp } from '@clerk/nextjs';
import { PageContainer } from '@/components';

export default function SignUpPage() {
  return (
    <PageContainer
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <SignUp forceRedirectUrl="/cluster" signInUrl="/sign-in" />
    </PageContainer>
  );
}
