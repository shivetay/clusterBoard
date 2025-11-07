import Link from 'next/link';
import { CustomButton } from '@/components';

export default function Home() {
  return (
    <div>
      <main>
        tutaj jakas gadka szmatka
        <Link href="/cluster">
          <CustomButton>Cluster</CustomButton>
        </Link>
      </main>
    </div>
  );
}
