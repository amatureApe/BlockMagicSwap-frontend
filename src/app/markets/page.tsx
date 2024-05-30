'use client'
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';

import SearchBarMenu from '@/components/SearchBarMenu';

const MarketsPage = () => {
    const textColor = useColorModeValue(colors.offWhite, 'white');

    return (
        <Flex
            minH="100vh"
            alignItems="flex-start"
            justifyContent="center"
            pt="10vh"
            pb="10vh"
        >
            <Flex direction="column" align="center">
                <Text fontSize="5xl" fontWeight="bold" color={colors.lightBlue[100]} mb={4}>Markets</Text>
                <SearchBarMenu />
            </Flex>
        </Flex >
    );
};

export default MarketsPage;