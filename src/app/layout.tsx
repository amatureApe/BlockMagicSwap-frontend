// RootLayout.tsx
'use client';
import { Providers } from './providers';
import React from 'react';
import Header from '../components/Header';
import { WalletProvider } from '@/context/WalletConnect';
import Footer from '@/components/Footer';
import { Flex, Box } from '@chakra-ui/react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <WalletProvider>
            <Flex direction="column" minHeight="100vh">
              <Header />
              <Box flex="1">{children}</Box>
              <Footer />
            </Flex>
          </WalletProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;