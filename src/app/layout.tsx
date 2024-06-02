// layout.tsx
'use client';
import React from 'react';
import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import { Providers } from './providers';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { colors } from '@/components/styles/colors';
import { AccountProvider, useAccount } from '@/context/AccountContext';

interface RootLayoutProps {
  children: React.ReactNode;
}

const ContentWithHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentChain } = useAccount();

  return (
    <>
      <Header currentChain={currentChain} />
      <Box flex="1">{children}</Box>
    </>
  );
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
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
    <html lang="en">
      <body>
        <Providers>
          <AccountProvider>
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
              <ContentWithHeader>{children}</ContentWithHeader>
              <Footer />
            </Flex>
          </AccountProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
