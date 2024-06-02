// Inside app/markets/[contractMasterId]/[contractId]/page.tsx
"use client"
import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { addresses } from '@/contract/addresses';
import contractConnection from '@/contract/contractConnection';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { getTokenAddress, getFeedLabel, getTokenLabel, getYieldLabel, getEndDate, formatAddress, formatDate } from '@/utils/helperFunctions';

import { Box, Flex, Text, Badge, Divider, useColorModeValue, Tooltip, Button } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';

interface ContractDetailsPageProps {
    params: {
        contractMasterId: string;
        contractId: string;
    };
}

export default function ContractDetailsPage({ params }: ContractDetailsPageProps) {
    const { account } = useContext(AccountContext);
    const { contractMasterId, contractId } = params;
    const [swapContract, setSwapContract] = useState<SwapContract | null>(null);

    const bg = useColorModeValue(colors.offBlack, 'gray.800');
    const color = useColorModeValue(colors.offWhite, 'white');

    useEffect(() => {
        async function fetchContractDetails() {
            const contract = await contractConnection({
                address: addresses.arbitrum.contracts.cryptoSwap,
                abi: cryptoSwapAbi
            });

            if (contract) {
                const swapContract = await contract.getSwapContract(Number(contractMasterId), Number(contractId));
                setSwapContract(swapContract);
            } else {
                console.error('Failed to connect to the contract.');
            }
        }

        fetchContractDetails();
    }, [account, contractMasterId, contractId]);

    if (!swapContract) {
        return <div>Loading...</div>;
    }

    const { userA, userB, period, legA, legB, settlementTokenId, yieldId, notionalAmount, yieldShares, status } = swapContract;

    return (
        <Flex justify="center" align="center" minH="100vh">
            <Box p={8} shadow="xl" bg={bg} borderWidth="1px" borderRadius="lg" maxW="800px" w="100%">
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Text color={color} fontSize="3xl" fontWeight="bold">{getFeedLabel(legA.feedId)}</Text>
                    <Badge colorScheme="blue" mb={3} fontSize="lg">{`Contract ID: ${contractId}`}</Badge>
                    <Text color={color} fontSize="3xl" fontWeight="bold">{getFeedLabel(legB.feedId)}</Text>
                </Flex>
                <Divider mb={6} />

                <Flex justify="space-between" mb={6}>
                    <Flex direction="column">
                        <Tooltip label={userA} aria-label="Full address">
                            <Text color={colors.lightBlue[200]} fontSize="xl"><strong>User A:</strong> {formatAddress(userA)}</Text>
                        </Tooltip>
                        <Button>Withdraw</Button>
                    </Flex>


                    <Tooltip label={userB} aria-label="Full address">
                        <Text color={colors.lightBlue[200]} fontSize="xl"><strong>User B:</strong> {formatAddress(userB)}</Text>
                    </Tooltip>
                </Flex>

                <Divider mb={6} />

                <Text color={colors.lightBlue[200]} fontSize="xl" mb={6}>
                    <strong>Notional:</strong> {notionalAmount.toString()}
                    <Tooltip label={getTokenAddress(settlementTokenId)}>
                        <span>{' '}{getTokenLabel(settlementTokenId)}</span>
                    </Tooltip>
                </Text>

                <Divider mb={6} />

                <Text color={colors.lightBlue[200]} fontSize="xl" mb={2}><strong>Start Date:</strong> {formatDate(period.startDate)}</Text>
                <Text color={colors.lightBlue[200]} fontSize="xl" mb={2}><strong>End Date:</strong> {getEndDate(period.startDate, period.periodInterval, period.totalIntervals)}</Text>
                <Text color={colors.lightBlue[200]} fontSize="xl" mb={6}><strong>Interval: </strong> Every {(period.periodInterval / 86400).toString()} day(s) </Text>

                <Divider mb={6} />

                <Flex>
                    <Text color={colors.lightBlue[200]} fontSize="xl" mb={6}><strong>Yield:</strong> {getYieldLabel(yieldId)}</Text>
                </Flex>
                <Flex>
                    <Text color={colors.lightBlue[200]} fontSize="xl" mb={6}><strong>Yield Shares:</strong> {yieldShares.toString()}</Text>
                </Flex>

                <Divider mb={6} />

                <Text color={colors.lightBlue[200]} fontSize="xl"><strong>Status:</strong> {status.toString()}</Text>
            </Box>
        </Flex >
    );
}