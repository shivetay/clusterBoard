import { Box } from '@mui/material';
// import { Menu } from '@/components';

export default function ClusterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box
        sx={{
          gridArea: 'menu',
          padding: '1rem 2rem',
        }}
      >
        {/* <Menu items="cluster" /> */}
      </Box>
      {children}
    </>
  );
}
