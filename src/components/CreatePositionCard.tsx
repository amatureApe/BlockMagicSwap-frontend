import { useState } from 'react';

import { Box, Flex, Text, Input, Select, Button, Collapse } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { colors } from './styles/colors';

const CreatePositionCard = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [currency, setCurrency] = useState('');
    const [notional, setNotional] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amplifier, setAmplifier] = useState('');
    const [fixDate, setFixDate] = useState('');
    const [yieldValue, setYield] = useState('');  // "yield" is a reserved word in JavaScript
    const [reserve, setReserve] = useState('');
    const toggleAdvanced = () => {
        setShowAdvanced(!showAdvanced);
    }

    return (
        <Flex align="center" justify="center" bg={colors.offBlack} rounded="md" boxShadow="xl" p={8}>
            <Flex direction="column" gap={4}>
                <Flex direction="column" borderBottom="2px solid" borderColor={colors.lightBlue[200]} pb={2}>
                    <Flex gap={8} justifyContent="space-between">
                        <Flex>
                            <Select placeholder="Leg A" variant="filled" bg={colors.offBlack} color={colors.offWhite} />
                        </Flex>
                        <Box width="2px" bg={colors.lightBlue[200]} height="40px" />
                        <Flex>
                            <Select placeholder="Leg A" variant="filled" bg={colors.offBlack} color={colors.offWhite} />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex justifyContent="center">
                    <Text fontSize="md" color={colors.lightBlue[200]}>Specifications</Text>
                </Flex>
                <Flex direction="column" gap={4} borderBottom="2px solid" borderColor={colors.lightBlue[200]} pb={4}>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Currency: </Text>
                        </Flex>
                        <Select
                            placeholder="Currency"
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Notional: </Text>
                        </Flex>
                        <Input
                            placeholder="Notional"
                            value={notional}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            onChange={(e) => setNotional(e.target.value)}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">Start Date: </Text>
                        </Flex>
                        <Input
                            placeholder="Start Date"
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">End Date: </Text>
                        </Flex>
                        <Input
                            placeholder="End Date"
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Flex>
                    <Flex align="center" onClick={() => setShowAdvanced(!showAdvanced)}>
                        <Text fontSize="xl" color={colors.lightBlue[100]} _hover={{ textDecoration: 'underline' }} cursor="pointer">
                            Advanced
                        </Text>
                        {showAdvanced ? (
                            <ArrowUpIcon boxSize={5} color={colors.lightBlue[100]} cursor="pointer" mt={1} ml={1} />
                        ) : (
                            <ArrowDownIcon boxSize={5} color={colors.lightBlue[100]} cursor="pointer" mt={1} ml={1} />
                        )}
                    </Flex>

                </Flex>

                <Collapse in={showAdvanced} animateOpacity>
                    <Flex direction="column" gap={4}>
                        <Flex>
                            <Flex alignItems="center">
                                <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">Amplifier: </Text>
                            </Flex>
                            <Input
                                placeholder="Amplifier"
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                value={amplifier}
                                onChange={(e) => setAmplifier(e.target.value)}
                            />                        </Flex>
                        <Flex>
                            <Flex alignItems="center">
                                <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">Fix Date: </Text>
                            </Flex>
                            <Input
                                placeholder="Fix Date"
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                value={fixDate}
                                onChange={(e) => setFixDate(e.target.value)}
                            />                        </Flex>
                        <Flex>
                            <Flex alignItems="center">
                                <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Yield: </Text>
                            </Flex>
                            <Select
                                placeholder="Yield"
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                value={yieldValue}
                                onChange={(e) => setYield(e.target.value)}
                            />
                        </Flex>
                        <Flex>
                            <Flex alignItems="center">
                                <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">Reserve: </Text>
                            </Flex>
                            <Input
                                placeholder="Reserve"
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                value={reserve}
                                onChange={(e) => setReserve(e.target.value)}
                            />                        </Flex>
                    </Flex>
                </Collapse>

                <Flex justifyContent="center">
                    <Text fontSize="md" color={colors.lightBlue[200]}>Summary</Text>
                </Flex>
                <Text fontSize="sm" color="white">
                    This position is a synthetic equity swap between "Leg A" and "Leg B"...
                </Text>
                <Flex justifyContent="center">
                    <Button w={150} mt={4} backgroundColor={colors.lightBlue[200]} color={colors.offBlack}>Create</Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CreatePositionCard;
