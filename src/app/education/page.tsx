'use client'
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';

const EducationPage = () => {
    const textColor = useColorModeValue(colors.offWhite, 'white');

    return (
        <Flex
            height="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Box>
                <Text fontSize="4xl" color={textColor}>
                    Education Page Content
                </Text>
            </Box>
        </Flex>
    );
};

export default EducationPage;