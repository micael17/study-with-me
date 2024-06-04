import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from '@/app/header';
import Timer from '@/components/timer/client/timer';
import { AuthProvider } from './authProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <Header />
            {children}
            <Timer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
