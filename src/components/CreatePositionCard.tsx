import React, { useState } from 'react';
import { Box, Flex, Text, Input, Select, Button, Collapse, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { colors } from './styles/colors';
import contractConnection from '@/contract/contractConnection';
import { addresses } from '@/contract/addresses';
import cryptoSwapAbi from '@/contract/CryptoSwapAbi.json';

const CreatePositionCard = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [contractCreationCount, setContractCreationCount] = useState('');
    const [notionalAmount, setNotionalAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [feedIdA, setFeedIdA] = useState('');
    const [feedIdB, setFeedIdB] = useState('');
    const [periodType, setPeriodType] = useState('');
    const [totalIntervals, setTotalIntervals] = useState('');
    const [settlementTokenId, setSettlementTokenId] = useState('');
    const [yieldId, setYieldId] = useState('');

    const toggleAdvanced = () => setShowAdvanced(!showAdvanced);

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
            periodType,
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
                            <Select value={feedIdA} onChange={(e) => setFeedIdA(e.target.value)} placeholder="Leg A" variant="filled" bg={colors.offBlack} color={colors.offWhite} />
                        </Flex>
                        <Box width="2px" bg={colors.lightBlue[200]} height="40px" />
                        <Flex>
                            <Select value={feedIdB} onChange={(e) => setFeedIdB(e.target.value)} placeholder="Leg A" variant="filled" bg={colors.offBlack} color={colors.offWhite} />
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
                            placeholder="Select Settlement Token"
                            value={settlementTokenId}
                            onChange={(e) => setSettlementTokenId(e.target.value)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Notional: </Text>
                        </Flex>
                        <Input
                            placeholder="Notional must be a multiple of 10"
                            value={notionalAmount}
                            onChange={(e) => setNotionalAmount(e.target.value)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                        />
                    </Flex>
                    <Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={colors.offWhite} as="b" mr={4}>Notional: </Text>
                        </Flex>
                        <Input
                            type="date"
                            placeholder="Notional must be a multiple of 10"
                            value={notionalAmount}
                            onChange={(e) => setNotionalAmount(e.target.value)}
                            backgroundColor={colors.offBlack}
                            color={colors.lightBlue[100]}
                            borderColor={colors.lightBlue[200]}
                            _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
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
                                <Text fontSize="lg" color={colors.offWhite} as="b" mr={4} whiteSpace="nowrap">Yield: </Text>
                            </Flex>
                            <Select
                                placeholder="Select Yield"
                                backgroundColor={colors.offBlack}
                                color={colors.lightBlue[100]}
                                borderColor={colors.lightBlue[200]}
                                _focus={{ borderColor: colors.lightBlue[200], borderWidth: '2px' }}
                                value={yieldId}
                                onChange={(e) => setYieldId(e.target.value)}
                            />
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
            </Flex>
        </Flex>
    );
};

export default CreatePositionCard;
