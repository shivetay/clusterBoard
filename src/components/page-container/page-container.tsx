import type { PropsWithChildren, ReactNode } from 'react';
import { Container } from './page-container.styled';

type TPageProps = PropsWithChildren & {
  children: ReactNode;
};

export function PageContainer(props: TPageProps) {
  const { children } = props;
  return <Container>{children}</Container>;
}

export default PageContainer;
