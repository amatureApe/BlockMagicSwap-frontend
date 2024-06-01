import React from 'react';
import { Input, Button, Flex, Switch, ButtonGroup, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { colors } from './styles/colors';

interface SearchMenuProps {
    setStatus: (status: string | null) => void;
}

const SearchBarMenu: React.FC<SearchMenuProps> = ({ setStatus }) => {

    return (
        <Flex align="center" justify="center" p={2} borderBottomWidth="2px">
            <ButtonGroup mr={4} variant="ghost">
                <Button w={20} bgColor="none" onClick={() => setStatus(null)}>
                    <Text color={colors.lightBlue[200]}>All</Text>
                </Button>
                <Button w={20} bgColor="none" onClick={() => setStatus('0')}>
                    <Text color={colors.lightBlue[200]}>Open</Text>
                </Button>
                <Button w={20} bgColor="none" onClick={() => setStatus('1')}>
                    <Text color={colors.lightBlue[200]}>Active</Text>
                </Button>
                <Button w={20} bgColor="none" onClick={() => setStatus('2')}>
                    <Text color={colors.lightBlue[200]}>Settled</Text>
                </Button>
            </ButtonGroup>

            <Input placeholder="Search" width="xl" />

            <Flex ml={4} align="center">
                <Button mr={2} px={10} backgroundColor={colors.lightBlue[200]} color={colors.offBlack}>Filters</Button>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="market-view-switch" mb="0" ml={2}>
                        View
                    </FormLabel>
                    <Switch id="market-view-switch" colorScheme='blue' />
                </FormControl>
            </Flex>
        </Flex>
    );
};

export default SearchBarMenu;
