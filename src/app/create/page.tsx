'use client'
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import CreatePositionCard from '@/components/CreatePositionCard';

import { colors } from '@/components/styles/colors';

const CreatePage = () => {
    const bgColor = useColorModeValue(colors.darkGray, 'gray.100');
    const textColor = useColorModeValue(colors.offWhite, 'white');

    return (
        <Flex
            height="100vh"
            alignItems="flex-start"
            justifyContent="center"
            backgroundColor={bgColor}
            pt="10vh"
        >
            <Flex direction="column" align="center">
                <Text fontSize="5xl" fontWeight="bold" color={colors.lightBlue[100]} mb={4}>Create Position</Text>
                <CreatePositionCard />
            </Flex>
        </Flex >
    );
};

export default CreatePage;