import { SignIn } from '@clerk/nextjs';
import { PageContainer } from '@/components';

export default function SignInPage() {
  return (
    <PageContainer
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <SignIn forceRedirectUrl="/cluster" signUpUrl="/sign-up" />
    </PageContainer>
  );
}
