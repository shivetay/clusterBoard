import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Footer, Header, Modal } from '@/components';
import { I18nProvider, ModalProvider } from '@/providers';
import { ThemeProvider } from '@/theme';
import { LayoutContainer } from './layout.styled';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cluster Board',
  description: 'Cluster Board',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={poppins.variable}>
      <body>
        <ThemeProvider>
          <ModalProvider>
            <I18nProvider locale="pl">
              <LayoutContainer>
                <Header />
                {children}
                <Footer />
              </LayoutContainer>
            </I18nProvider>
            <Modal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
