import { Flex, Box, Text, Button, Link } from '@chakra-ui/react';
import { colors } from './styles/colors';

const Header = () => {
    return (
        <Flex as="header" bg={colors.offBlack} p={4} color="white" justifyContent="space-between" alignItems="center">
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
                <Link href="/dashboard">
                    <Text fontSize="lg" fontWeight="bold">Dashboard</Text>
                </Link>
                <Link href="/staking">
                    <Text fontSize="lg" fontWeight="bold">Staking</Text>
                </Link>
            </Flex>

            <Box>
                <Button colorScheme="teal" mr={4}>
                    Login
                </Button>
                <Button colorScheme="teal">
                    Sign Up
                </Button>
            </Box>
        </Flex>
    );
};

export default Header;
