import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { colors } from './styles/colors';

const Note = ({ children }: { children: React.ReactNode }) => {

    const bgColor = useColorModeValue(`#000000BB`, '#000000CC'); // Use hexadecimal color with transparency

    return (
        <VStack
            bg={colors.darkerGray}
            rounded="md"
            border="1px solid"
            borderColor="gray.200"
            my={4}
        >

            <Box
                px={4}
                py={2}
                borderBottom="1px solid"
                borderBottomColor="gray.200"
            >
                <Text>{children}</Text>
            </Box>


        </VStack>
    )

}
export default Note;