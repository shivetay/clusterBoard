import { plPL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { AlertPopup, Footer, Header, Modal } from '@/components';
import { getServerHealth } from '@/lib';
import {
  AlertProvider,
  I18nProvider,
  ModalProvider,
  NavigationProvider,
  NotificationLiveSubscriber,
  QueryProvider,
} from '@/providers';
import { ServerUserProvider } from '@/providers/server-user-provider';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const health = await getServerHealth();
  const showAuthLinks = health?.status === 'ok';
  const apiVersion = health?.version ?? null;

  return (
    <ClerkProvider
      localization={plPL}
      afterSignOutUrl="/sign-in"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInForceRedirectUrl="/cluster"
      signUpForceRedirectUrl="/cluster"
    >
      <html lang="pl" className={poppins.variable}>
        <body>
          <ThemeProvider>
            <AlertProvider>
              <NavigationProvider>
                <ModalProvider>
                  <QueryProvider>
                    <NotificationLiveSubscriber />
                    <ServerUserProvider>
                      <I18nProvider locale="pl">
                        <LayoutContainer>
                          <Header showAuthLinks={showAuthLinks} />
                          {children}
                          <Footer apiVersion={apiVersion} />
                        </LayoutContainer>
                      </I18nProvider>
                      <div id="modal-root" />
                      <Modal />
                      <AlertPopup />
                    </ServerUserProvider>
                  </QueryProvider>
                </ModalProvider>
              </NavigationProvider>
            </AlertProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
