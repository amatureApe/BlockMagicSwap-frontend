// RootLayout.tsx
'use client';
import { Providers } from './providers';
import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import { WalletProvider } from '@/context/WalletConnect';
import Footer from '@/components/Footer';
import { Flex, Box, useColorModeValue, AspectRatio } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const AccountContext = React.createContext<{ account: string | null; setAccount: React.Dispatch<React.SetStateAction<string | null>>; }>({ account: null, setAccount: () => { } });

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  const gradientDark = 'linear(to-r, pink.500, purple.500)';
  const gradientLight = `linear(to-br, ${colors.darkGray}, ${colors.offBlack}, blue.500)`;
  const bgGradient = useColorModeValue(gradientLight, gradientDark);
  const glowDark = {
    filter: 'blur(70px)',
    opacity: 0.2,
    mixBlendMode: 'screen',
    pointerEvents: 'none',
    borderRadius: '100%',
  };
  const move = {
    animation: 'floater 8s linear infinite',
    animationDelay: '0s',
  };

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <html lang="en">
        <body>
          <Providers>
            <WalletProvider>
              {/* <Flex direction="column" minHeight="100vh" position="relative" bg="#1A1D26"> */}
              <Flex direction="column" minHeight="100vh" position="relative" bg={colors.darkGray}>
                <Box
                  className="transition pointer-events-none"
                  sx={{ ...glowDark, ...move }}
                  position={{ base: 'fixed' }}
                  aspectRatio={4 / 3}
                  height="50vh"
                  top="-40%"
                  left={-150}
                  transitionDuration="150ms"
                  style={{ animationDelay: '-4s' }}
                  bg="#1BE3C2"
                />
                <Box
                  className="transition pointer-events-none"
                  sx={{ ...glowDark, ...move }}
                  position={{ base: 'fixed' }}
                  aspectRatio={3 / 2}
                  height="50vh"
                  top="-10%"
                  left={-540}
                  transitionDuration="75ms"
                  style={{ animationDelay: '-1s' }}
                  bg="#7AB7FF"
                />
                <Box
                  className="transition pointer-events-none"
                  sx={{ ...glowDark, ...move }}
                  position={{ base: 'fixed' }}
                  aspectRatio={1 / 1}
                  height="45vh"
                  top="45%"
                  left="90%"
                  transitionDuration="300ms"
                  style={{ animationDelay: '-6s' }}
                  bg="#1BE3C2"
                />
                <Header account={account} setAccount={setAccount} />
                <Box flex="1">{children}</Box>
                <Footer />
              </Flex>
            </WalletProvider>
          </Providers>
        </body>
      </html>
    </AccountContext.Provider>
  );
};

export default RootLayout;