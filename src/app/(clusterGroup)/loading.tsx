import { ClerkLoading } from '@clerk/nextjs';
import { Loader } from '@/components/ui';

export default function Loading() {
  return (
    <ClerkLoading>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader />
      </div>
    </ClerkLoading>
  );
}
