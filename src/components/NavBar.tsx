import React from 'react';
import { Box, Flex, Heading, Stack, Text, VStack, Link } from '@chakra-ui/react';
// import { colors } from './styles/colors';

const NavBar = () => {
    return (
        <Flex h="100vh">
            <VStack bg="transparent" p={4} align="flex-start">
                <Text fontSize="xl" fontWeight="bold">Documentation</Text>
                <Text><Link href="#introduction">Introduction</Link></Text>
                <Text>Getting Started</Text>
                <Text>API Reference</Text>
                <Text>Examples</Text>
                <Text>FAQ</Text>
            </VStack>
            <Separator />
            <Box flex={1} p={4}
            >
                <Stack spacing={6} >
                    <Heading id="introduction" as='h1' size='4xl' noOfLines={1}>
                        Introduction
                    </Heading>
                    <Heading id="introduction" as='h2' size='4xl' noOfLines={1}>
                        What Panda Finance do?
                    </Heading>
                    <Text>
                        <b>Panda Finance</b> brings traditional finance swaps to the blockchain. This exposes a wider range of assets, including
                        both crypto and traditional assets, making derivative tools more accessible to a broader audience and lowering the
                        barrier for many people to use these powerful financial instruments.
                    </Text>
                    <Heading as='h2' size='3xl' noOfLines={1}>
                        What is a Swaps in Finance?
                    </Heading>
                    <Text>
                        Swaps in finance involve a contract between two or more parties on a derivative contract which involves an exchange
                        of cash flow based on a predetermined notional principal amount, which usually includes interest rate swaps which is
                        the exchange of floating rate interest with a fixed rate of interest and the currency swaps which is the exchange of
                        fixed currency rate of one country with floating currency rate of another country etc.
                    </Text>
                    <Text>
                        - reference: <Link href='https://www.wallstreetmojo.com/swaps-finance/'>swaps-finance</Link>
                    </Text>

                    <Heading as='h2' size='2xl'>
                        Advantages of Panda Finance
                    </Heading>
                    <Heading as='h2' size='xl'>
                        (xl) In love with React & Next
                    </Heading>
                    <Heading as='h3' size='lg'>
                        (lg) In love with React & Next
                    </Heading>
                    <Heading as='h4' size='md'>
                        (md) In love with React & Next
                    </Heading>
                    <Heading as='h5' size='sm'>
                        (sm) In love with React & Next
                    </Heading>
                    <Heading as='h6' size='xs'>
                        (xs) In love with React & Next
                    </Heading>
                </Stack>
            </Box>
        </Flex>
    );
};

const Separator = () => {
    return <Box borderRight="1px solid gray" height="100%" />;
};

export default NavBar;
