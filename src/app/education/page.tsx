'use client'
import { Box, Text, Flex, useColorModeValue, VStack, Link } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';
import EducationPageContent from './EducationPageContent';

const EducationPage = () => {
    // const textColor = useColorModeValue(colors.offWhite, 'white');

    return (
        <Flex
            height="100vh"
            align="stretch"
        // alignItems="center"
        // justifyContent="center"
        >
            <Box as="aside" p={4} borderRight="1px solid gray" position="sticky" top={0}>
                <VStack bg="transparent" p={4} align="flex-start">
                    <Text fontSize="2xl" fontWeight="bold">Documentation</Text>
                    <Text fontSize="xl"><Link href="#introduction">Introduction</Link></Text>
                    <Text fontSize="2lg"><Link href="#whatIsASwap">What is a Swap in Finance?</Link></Text>
                    <Text fontSize="2lg"><Link href="#pros">Advantages of Panda Finance</Link></Text>
                    <Text fontSize="2lg"><Link href="#glossary">Glossary</Link></Text>
                </VStack>
            </Box>
            <Box flex={1} p={4} overflowY="scroll">
                <EducationPageContent />
            </Box>
        </Flex>
    );
};

export default EducationPage;