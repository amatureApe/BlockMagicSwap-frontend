import React, { useState } from 'react';
import { Box, Flex, Text, Input, Select, Button, Collapse, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { colors } from './styles/colors';
import contractConnection from '@/contract/contractConnection';
import { addresses } from '@/contract/addresses';
import cryptoSwapAbi from '@/contract/CryptoSwapAbi.json';
import { feedOptions, periodOptions, tokenOptions, yieldOptions } from './utils/selectOptions';


const CreatePositionCard = () => {
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [contractCreationCount, setContractCreationCount] = useState<number | null>(null);
    const [notionalAmount, setNotionalAmount] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<number>(0);
    const [feedIdA, setFeedIdA] = useState<number | null>(null);
    const [feedIdB, setFeedIdB] = useState<number | null>(null);
    const [periodInterval, setPeriodInterval] = useState<number | null>(null);
    const [totalIntervals, setTotalIntervals] = useState<number | null>(1);
    const [settlementTokenId, setSettlementTokenId] = useState<number | null>(null);
    const [yieldId, setYieldId] = useState<number | null>(null);

    const handleNumericChange = (value: string, setState: React.Dispatch<React.SetStateAction<number | null>>) => {
        const numValue = Number(value);
        if (!isNaN(numValue) && value.trim() !== '') {
            setState(numValue);
        } else {
            setState(null);
        }
    };

    const handleInputNumericChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number | null>>) => {
        handleNumericChange(e.target.value, setState);
    };


    const handleDateChange = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00Z'); // Append 'T00:00:00Z' to set time to 00:00 UTC
        setStartDate(date.getTime()); // Convert the date to a timestamp and update state
    };

    const handleOpenSwap = async () => {
        const contract = await contractConnection({ address: addresses.arbitrum.contracts.cryptoSwap, abi: cryptoSwapAbi });
        if (!contract) {
            console.error("Contract not connected");
            return;
        }

        const tx = await contract.openSwap(
            contractCreationCount,
            notionalAmount,
            startDate,
            feedIdA,
            feedIdB,
            periodInterval,
            totalIntervals,
            settlementTokenId,
            yieldId
        );
        console.log("Transaction hash:", tx.hash);
    };

    return (
        <Flex align="center" justify="center" bg={colors.offBlack} rounded="md" boxShadow="xl" p={8}>
            <Flex direction="column" gap={4}>
                <Flex direction="column" borderBottom="2px solid" borderColor={colors.lightBlue[200]} pb={2}>
                    <Flex gap={8} justifyContent="space-between">
                        <Flex>
                            <Select
                                placeholder="Leg A"
                                value={feedIdA ?? ''}
                                onChange={(e) => setFeedIdA(e.target.value ? Number(e.target.value) : null)}
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            >
                                {feedOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Select>                        </Flex>
                        <Box width="2px" bg={colors.lightBlue[200]} height="40px" />
                        <Flex>
                            <Select
                                placeholder="Leg B"
                                value={feedIdB ?? ''}
                                onChange={(e) => setFeedIdB(e.target.value ? Number(e.target.value) : null)}
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            >
                                {feedOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Select>
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
                            placeholder="Settlement Token"
                            value={settlementTokenId ?? ''}
                            onChange={(e) => setSettlementTokenId(e.target.value ? Number(e.target.value) : null)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        >
                            {tokenOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Notional: </Text>
                        </Flex>
                        <Input
                            placeholder="Notional must be a multiple of 10"
                            value={notionalAmount ? notionalAmount.toString() : ''}
                            onChange={(e) => handleInputNumericChange(e, setNotionalAmount)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Contracts: </Text>
                        </Flex>
                        <Input
                            placeholder="Number of Positions to Create"
                            value={contractCreationCount ? contractCreationCount.toString() : ''}
                            onChange={(e) => handleInputNumericChange(e, setContractCreationCount)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Start: </Text>
                        </Flex>
                        <Input
                            type="date"
                            value={startDate ? new Date(startDate).toISOString().substring(0, 10) : ''}
                            onChange={(e) => handleDateChange(e.target.value)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Period: </Text>
                        </Flex>
                        <Select
                            placeholder="Period Interval"
                            value={periodInterval ?? ''}
                            onChange={(e) => setPeriodInterval(e.target.value ? Number(e.target.value) : null)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        >
                            {periodOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Intervals: </Text>
                        </Flex>
                        <NumberInput
                            value={totalIntervals ?? 1}
                            min={1}
                            onChange={(valueString) => handleNumericChange(valueString, setTotalIntervals)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }} >
                            <NumberInputField _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }} />
                            <NumberInputStepper>
                                <NumberIncrementStepper
                                    backgroundColor={colors.offBlack}
                                    color={colors.lightBlue[100]}
                                    borderColor={colors.lightBlue[200]}
                                    _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                />
                                <NumberDecrementStepper
                                    backgroundColor={colors.offBlack}
                                    color={colors.lightBlue[100]}
                                    borderColor={colors.lightBlue[200]}
                                    _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                />
                            </NumberInputStepper>
                        </NumberInput>
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
                                <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">Yield: </Text>
                            </Flex>
                            <Select
                                placeholder="Select Yield"
                                value={yieldId ?? ''}
                                onChange={(e) => setYieldId(e.target.value ? Number(e.target.value) : null)}
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                            >
                                {yieldOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                </Collapse>

                <Flex justifyContent="center">
                    <Text fontSize="md" color={colors.lightBlue[200]}>Summary</Text>
                </Flex>
                <Text fontSize="sm" color="white">
                    This position is a synthetic equity swap between Leg A and Leg B...
                </Text>
                <Flex justifyContent="center">
                    <Button
                        w={150}
                        mt={4}
                        backgroundColor={colors.lightBlue[200]}
                        color={colors.offBlack}
                        _hover={{ bg: colors.lightBlue[100] }}
                    >
                        Create
                    </Button>
                </Flex>
            </Flex >
        </Flex >
    );
};

export default CreatePositionCard;
