"use client"
import React, { useState } from 'react';
import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';
import SearchBarMenu from '@/components/SearchBarMenu';
import CardsWrap from '@/components/CardsWrap';
import { useSwapContracts } from '@/contract/hooks/useSwapContracts';

const MarketsPage = () => {
    const textColor = useColorModeValue(colors.offWhite, 'white');
    const { swapContracts, loading } = useSwapContracts(); // Use the hook to get contracts and loading state
    const [myPosition, setMyPosition] = useState<boolean>(false);

    // Filters 
    const [status, setStatus] = useState<string | null>(null);

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
                <SearchBarMenu setStatus={setStatus} setMyPosition={setMyPosition} myPosition={myPosition} />
                <Flex mt={8}>
                    {loading ? (
                        <Spinner color="blue.500" />
                    ) : (
                        <CardsWrap contracts={swapContracts} status={status} myPosition={myPosition} />
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MarketsPage;
