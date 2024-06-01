'use client'
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import CreatePositionCard from '@/components/CreatePositionCard';

import { colors } from '@/components/styles/colors';

const CreatePage: React.FC = () => {

    return (
        <Flex
            minH="100vh"
            alignItems="flex-start"
            justifyContent="center"
            pt="10vh"
            pb="10vh"
        >
            <Flex direction="column" align="center">
                <Text fontSize="5xl" fontWeight="bold" color={colors.lightBlue[100]} mb={4}>Create Position</Text>
                <CreatePositionCard />
            </Flex>
        </Flex >
    );
};

export default CreatePage;