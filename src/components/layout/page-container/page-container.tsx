import type { SxProps, Theme } from '@mui/material';
import type { PropsWithChildren, ReactNode } from 'react';
import { Container } from './page-container.styled';

type TPageProps = PropsWithChildren & {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function PageContainer(props: TPageProps) {
  const { children, sx } = props;
  return <Container sx={sx}>{children}</Container>;
}

export default PageContainer;
