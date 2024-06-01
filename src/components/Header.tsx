// Header.tsx
"use client";
import { ethers } from 'ethers';
import { Flex, Box, Text, Button, Link, useColorModeValue } from '@chakra-ui/react';
import { colors } from './styles/colors';
import { useWallet } from '@/context/WalletConnect';

type HeaderProps = {
    account: string | null;
    setAccount: React.Dispatch<React.SetStateAction<string | null>>;
};


const Header: React.FC<HeaderProps> = ({ account, setAccount }) => {

    const connectAccount = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            } catch (error) {
                console.error("Failed to connect account:", error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature!');
        }
    };

    const bgColor = useColorModeValue(`#000000BB`, '#000000CC');


    return (
        <Flex as="header" bg={bgColor} p={4} color="white" justifyContent="space-between" alignItems="center">
            <Flex gap="10" ml={8}>
                <Link href="/">
                    <Text fontSize="lg" fontWeight="bold">Home</Text>
                </Link>
                <Link href="/education">
                    <Text fontSize="lg" fontWeight="bold">Education</Text>
                </Link>
                <Link href="/markets">
                    <Text fontSize="lg" fontWeight="bold">Markets</Text>
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
            <Box>
                {account ? (
                    <Flex direction="row" align="center" px={5}>
                        <Button bg={colors.lightBlue[200]} color={colors.offBlack} _hover={{ bg: colors.lightBlue[100] }}>
                            <Flex direction="column">
                                <Text fontSize={16}>{account.slice(0, 5) + '...' + account.slice(-4)}</Text>
                            </Flex>
                        </Button>
                    </Flex>
                ) : (
                    <Button bgColor={colors.lightBlue[200]} color={colors.offBlack} onClick={connectAccount}>
                        Connect Wallet
                    </Button>
                )}
            </Box>
        </Flex>
    );
};

export default Header;