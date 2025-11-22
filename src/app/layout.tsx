import { plPL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AlertPopup, Footer, Header, Modal } from '@/components';
import {
  AlertProvider,
  I18nProvider,
  ModalProvider,
  QueryProvider,
  UserProvider,
} from '@/providers';
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
    <ClerkProvider localization={plPL}>
      <html lang="pl" className={poppins.variable}>
        <body>
          <ThemeProvider>
            <AlertProvider>
              <ModalProvider>
                <QueryProvider>
                  <UserProvider>
                    <I18nProvider locale="pl">
                      <LayoutContainer>
                        <Header />
                        {children}
                        <Footer />
                      </LayoutContainer>
                    </I18nProvider>
                    <Modal />
                    <AlertPopup />
                  </UserProvider>
                </QueryProvider>
              </ModalProvider>
            </AlertProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
