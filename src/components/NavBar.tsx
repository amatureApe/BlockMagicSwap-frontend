import React from 'react';
import { Box, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
// import { colors } from './styles/colors';

const NavBar = () => {
    return (
        <Flex h="100vh">
            <VStack bg="transparent" p={4} align="flex-start">
                <Text fontSize="xl" fontWeight="bold">Documentation</Text>
                <Text>Introduction</Text>
                <Text>Getting Started</Text>
                <Text>API Reference</Text>
                <Text>Examples</Text>
                <Text>FAQ</Text>
            </VStack>
            <Separator />
            <Box flex={1} p={4}
            >
                <Stack spacing={6} >
                    <Heading variant="underline" as='h1' size='4xl' noOfLines={1}>
                        (4xl) In love with React & Next
                    </Heading>
                    <Heading as='h2' size='3xl' noOfLines={1}>
                        (3xl) In love with React & Next
                    </Heading>
                    <Heading as='h2' size='2xl'>
                        (2xl) In love with React & Next
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
