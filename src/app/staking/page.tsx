'use client'
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';

const StakingPage = () => {
    const textColor = useColorModeValue(colors.offWhite, 'white');

    return (
        <Flex
            height="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Box>
                <Text fontSize="4xl" color={textColor}>
                    Staking Page Content
                </Text>
            </Box>
        </Flex>
    );
};

export default StakingPage;