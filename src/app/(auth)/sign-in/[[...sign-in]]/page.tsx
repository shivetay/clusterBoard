import { SignIn } from '@clerk/nextjs';
import { PageContainer } from '@/components';

export default function SignInPage() {
  return (
    <PageContainer>
      <SignIn />
    </PageContainer>
  );
}
