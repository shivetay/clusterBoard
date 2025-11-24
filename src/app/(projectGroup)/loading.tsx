import { ClerkLoading } from '@clerk/nextjs';
import { Loader } from '@/components/ui';

export default function Loading() {
  return (
    <ClerkLoading>
      <Loader />
    </ClerkLoading>
  );
}
