// Header.tsx
"use client";
import { Flex, Box, Text, Button, Link, useColorModeValue } from '@chakra-ui/react';
import { colors } from './styles/colors';
import { useAccount } from '@/context/AccountContext';

interface HeaderProps {
    currentChain: string | null;
}

const Header: React.FC<HeaderProps> = ({ currentChain }) => {
    const { account, connectAccount } = useAccount();

    const bgColor = useColorModeValue(`#000000BB`, '#000000CC');

    return (
        <Flex as="header" bg={bgColor} p={4} color="white" justifyContent="space-between" alignItems="center">
            <Flex gap="10" ml={8}>
                <Link href="/market">
                    <Text fontSize="lg" fontWeight="bold">Market</Text>
                </Link>
                <Link href="/education">
                    <Text fontSize="lg" fontWeight="bold">Education</Text>
                </Link>
                <Link href="/create">
                    <Text fontSize="lg" fontWeight="bold">Create</Text>
                </Link>
                {/* <Link href="/dashboard">
          <Text fontSize="lg" fontWeight="bold">Dashboard</Text>
        </Link>
        <Link href="/staking">
          <Text fontSize="lg" fontWeight="bold">Staking</Text>
        </Link> */}
            </Flex>
            <Flex align="center">
                <Box>
                    {account ? (
                        <Flex direction="row" align="center" px={5}>
                            <Button bg={colors.lightBlue[200]} color={colors.offBlack} _hover={{ bg: colors.lightBlue[100] }}>
                                <Flex direction="column">
                                    <Text fontSize={16} color={colors.offBlack}>{account.slice(0, 5) + '...' + account.slice(-4)}</Text>
                                </Flex>
                            </Button>
                            {currentChain && (
                                <Text fontSize="lg" fontWeight="bold" color={colors.offWhite} ml={4}>
                                    {currentChain.slice(0, 3).toUpperCase()}
                                </Text>
                            )}
                        </Flex>

                    ) : (
                        <Button bgColor={colors.lightBlue[200]} color={colors.offBlack} onClick={connectAccount}>
                            Connect Wallet
                        </Button>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

export default Header;