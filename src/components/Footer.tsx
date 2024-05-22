"use client";
import { Flex, Text, Link, Box } from '@chakra-ui/react';
import { colors } from './styles/colors';

const Footer: React.FC = () => {
    return (
        <Flex
            as="footer"
            bg={colors.offBlack}
            p={4}
            color="white"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box flex="1" />
            <Flex gap="10" justify="center">
                <Link href="/">
                    <Text fontSize="md" fontWeight="bold">Home</Text>
                </Link>
                <Link href="/education">
                    <Text fontSize="md" fontWeight="bold">Education</Text>
                </Link>
                <Link href="/markets">
                    <Text fontSize="md" fontWeight="bold">Markets</Text>
                </Link>
                <Link href="/create">
                    <Text fontSize="md" fontWeight="bold">Create</Text>
                </Link>
                <Link href="/dashboard">
                    <Text fontSize="md" fontWeight="bold">Dashboard</Text>
                </Link>
                <Link href="/staking">
                    <Text fontSize="md" fontWeight="bold">Staking</Text>
                </Link>
            </Flex>
            <Box flex="1" textAlign="right">
                <Text fontSize="sm" mr={8}>&copy; {new Date().getFullYear()} Panda Finance</Text>
            </Box>
        </Flex>
    );
};

export default Footer;