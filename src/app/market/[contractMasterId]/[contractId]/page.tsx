// Inside app/markets/[contractMasterId]/[contractId]/page.tsx
"use client"
import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import cryptoSwapAutomatedAbi from '@/contract/abis/CryptoSwapAutomated.json';
import { addresses } from '@/contract/addresses';
import contractConnection from '@/contract/contractConnection';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { getTokenAddress, getFeedLabel, getTokenLabel, getYieldLabel, getEndDate, formatAddress, formatDate, getStatusProps, getCurrentAddresses } from '@/utils/helperFunctions';
import { useToast } from '@chakra-ui/react';
import { checkApproval, approve } from '@/contract/checkApproval';

import { Box, Flex, Text, Badge, Divider, Tooltip, Button } from '@chakra-ui/react';
import { colors } from '@/components/styles/colors';

interface ContractDetailsPageProps {
    params: {
        contractMasterId: string;
        contractId: string;
    };
}

const ContractDetails: React.FC<ContractDetailsPageProps> = ({ params }) => {
    const { account, currentChain } = useContext(AccountContext);
    const { contractMasterId, contractId } = params;
    const [swapContract, setSwapContract] = useState<SwapContract | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tokenOptions, setTokenOptions] = useState([]);
    const [feedOptions, setFeedOptions] = useState([]);
    const [cryptoSwapAddr, setCryptoSwapAddr] = useState<string | undefined>(undefined);

    const toast = useToast();

    useEffect(() => {
        if (!currentChain) {
            console.error('Current chain is not set');
            toast({
                title: "Chain Required",
                description: "Please select a blockchain network.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        async function fetchContractDetails() {
            setIsLoading(true);
            try {
                const currentAddresses = getCurrentAddresses(currentChain);
                if (!currentAddresses) {
                    throw new Error("Failed to get current addresses for the chain: " + currentChain);
                }

                setTokenOptions(currentAddresses.tokens || []);
                setFeedOptions(currentAddresses.priceFeeds || []);
                setCryptoSwapAddr(currentAddresses.contracts.cryptoSwap);

                const abi = currentChain === 'arbitrum' ? cryptoSwapAbi : cryptoSwapAutomatedAbi;

                const contract = await contractConnection({
                    address: currentAddresses.contracts.cryptoSwap,
                    abi: abi
                });
                if (!contract) {
                    throw new Error('Failed to connect to the contract.');
                }

                const fetchedContract = await contract.getSwapContract(contractMasterId, contractId);
                console.log("PING", fetchedContract)
                setSwapContract(fetchedContract);
            } catch (error) {
                console.error('Error fetching contract details:', error);
                toast({
                    title: "Error Fetching Contract",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            setIsLoading(false);
        }

        fetchContractDetails();
    }, [contractMasterId, contractId, currentChain, toast]);

    // Rest of your component code


    useEffect(() => {
        if (swapContract) {
            console.log('Swap Contract:', swapContract);
            console.log('User A:', swapContract.userA);
            console.log(currentChain)
        }
    }, [swapContract]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!swapContract) {
        return <div>Contract not found or not loaded yet.</div>;
    }

    const { userA, userB, period, legA, legB, settlementTokenId, yieldId, notionalAmount, yieldShares, status } = swapContract;

    const handlePairSwap = async (contract: SwapContract, account: string, address: string) => {

        const cryptoSwap = await contractConnection({ address: address, abi: cryptoSwapAbi });

        if (!account) {
            toast({
                title: "Error",
                description: "Account not connected.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        if (cryptoSwap) {
            const isApproved = await checkApproval(getTokenAddress(tokenOptions, contract.settlementTokenId), address, account, contract.notionalAmount);
            if (!isApproved) {
                try {
                    await approve(getTokenAddress(tokenOptions, contract.settlementTokenId), address);
                } catch (error) {
                    console.error('Failed to approve token.', error);
                    toast({
                        title: "Error",
                        description: "Failed to approve the token.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                    return;
                }
            }

            try {
                const swapTx = await cryptoSwap.pairSwap(contract.contractMasterId, contract.contractId);
                await swapTx.wait();
            } catch (error) {
                console.error('Failed to execute pair swap.', error);
                toast({
                    title: "Error",
                    description: "Failed to execute the pair swap.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    }

    const renderStatusButton = (contract: SwapContract, account: string) => {
        const statusProps = getStatusProps(contract.status.toString());
        let buttonText = '';

        switch (contract.status.toString()) {
            case '0':
                buttonText = 'Take Position';
                break;
            case '1':
                buttonText = 'Position Active';
                break;
            case '2':
                buttonText = 'Position Settled';
                break;
            case '3':
                buttonText = 'Position Canceled';
                break;
            default:
                buttonText = 'Unknown Status';
        }

        return (
            <Button
                size="lg"
                w={250}
                isDisabled={contract.status.toString() !== '0'}
                colorScheme={statusProps.colorScheme}
                onClick={() => handlePairSwap(contract, account, cryptoSwapAddr as string)}
            >
                {buttonText}
            </Button>
        );
    };

    const handleWithdraw = async (contract: SwapContract, account: string, address: string) => {

        const cryptoSwap = await contractConnection({ address: address, abi: cryptoSwapAbi });
        if (cryptoSwap) {
            try {
                const withdrawTx = await cryptoSwap.withdrawWinnings(contract.contractMasterId, contract.contractId);
                await withdrawTx.wait();
            } catch (error) {
                console.error('Failed to withdraw winnings.', error);
                toast({
                    title: "Error",
                    description: "Failed to withdraw winnings.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    }

    return (
        <Flex justify="center" align="center" minH="100vh">
            <Box p={8} shadow="xl" bg={colors.offBlack} borderWidth="1px" borderRadius="lg" maxW="800px" w="100%">
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Text color={colors.offWhite} fontSize="3xl" fontWeight="bold">{getFeedLabel(feedOptions, legA.feedId)}</Text>
                    <Badge colorScheme="blue" mb={3} fontSize="lg">{`Contract: ${contractMasterId} - ${contractId}`}</Badge>
                    <Text color={colors.offWhite} fontSize="3xl" fontWeight="bold">{getFeedLabel(feedOptions, legB.feedId)}</Text>
                </Flex>
                <Divider mb={6} />

                <Flex justify="space-between">
                    <Flex direction="column">
                        <Tooltip label={userA} aria-label="Full address">
                            <Text color={colors.lightBlue[200]} fontSize="xl" mb={2}><strong>User A:</strong> {formatAddress(userA)}</Text>
                        </Tooltip>

                        <Flex direction="column" gap={1} mb={4}>
                            <Text color={colors.lightBlue[100]}><strong>Original Price: {legA.originalPrice.toString()} </strong></Text>
                            <Text color={colors.lightBlue[100]}><strong>Last Price: {legA.lastPrice.toString()} </strong></Text>
                            <Text color={colors.lightBlue[100]}><strong>Balance: {legA.balance.toString()}</strong></Text>
                            <Text color={colors.lightBlue[100]}><strong>Withdrawable: {legA.withdrawable.toString()}</strong></Text>
                        </Flex>
                    </Flex>

                    <Flex direction="column">
                        <Tooltip label={userB} aria-label="Full address">
                            <Text color={colors.lightBlue[200]} fontSize="xl" mb={2}><strong>User B:</strong> {formatAddress(userB)}</Text>
                        </Tooltip>

                        <Flex direction="column" gap={1} mb={4}>
                            <Text color={colors.lightBlue[100]}><strong>Original Price: {legB.originalPrice.toString()} </strong></Text>
                            <Text color={colors.lightBlue[100]}><strong>Last Price: {legB.lastPrice.toString()} </strong></Text>
                            <Text color={colors.lightBlue[100]}><strong>Balance: {legB.balance.toString()}</strong></Text>
                            <Text color={colors.lightBlue[100]}><strong>Withdrawable: {legB.withdrawable.toString()}</strong></Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex justifyContent="center">
                    <Button w={200} bg={colors.offWhite} color={colors.offBlack} onClick={() => handleWithdraw(swapContract, account as string, cryptoSwapAddr as string)}>Withdraw</Button>
                </Flex>

                <Divider my={6} />

                <Text color={colors.lightBlue[200]} fontSize="xl" mb={6}>
                    <strong>Notional:</strong> {notionalAmount.toString()}
                    <Tooltip label={getTokenAddress(tokenOptions, settlementTokenId)}>
                        <span>{' '}{getTokenLabel(tokenOptions, settlementTokenId)}</span>
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

                <Flex justifyContent="center">
                    {renderStatusButton(swapContract, account as string)}
                </Flex>
            </Box>
        </Flex >
    );
}

export default ContractDetails;