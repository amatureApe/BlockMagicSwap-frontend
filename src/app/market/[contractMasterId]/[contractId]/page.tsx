// Inside app/markets/[contractMasterId]/[contractId]/page.tsx
"use client"
import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { addresses } from '@/contract/addresses';
import contractConnection from '@/contract/contractConnection';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { getTokenAddress, getFeedLabel, getTokenLabel, getYieldLabel, getEndDate, formatAddress, formatDate, getStatusProps } from '@/utils/helperFunctions';
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
    const { account } = useContext(AccountContext);
    const { contractMasterId, contractId } = params;
    const [swapContract, setSwapContract] = useState<SwapContract | null>(null)
    const toast = useToast();

    const handlePairSwap = async (contract: SwapContract, account: string) => {
        const cryptoSwapAddr = addresses.arbitrum.contracts.cryptoSwap;

        const cryptoSwap = await contractConnection({ address: cryptoSwapAddr, abi: cryptoSwapAbi });

        if (!account) {
            console.log(account)
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
            const isApproved = await checkApproval(getTokenAddress(contract.settlementTokenId), cryptoSwapAddr, account, contract.notionalAmount);
            if (!isApproved) {
                try {
                    await approve(getTokenAddress(contract.settlementTokenId), cryptoSwapAddr);
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
                onClick={() => handlePairSwap(contract, account)}
            >
                {buttonText}
            </Button>
        );
    };

    const handleWithdraw = async (contract: SwapContract, account: string) => {
        const cryptoSwapAddr = addresses.arbitrum.contracts.cryptoSwap;

        const cryptoSwap = await contractConnection({ address: cryptoSwapAddr, abi: cryptoSwapAbi });
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
    });

    if (!swapContract) {
        return <div>Loading...</div>;
    }

    const { userA, userB, period, legA, legB, settlementTokenId, yieldId, notionalAmount, yieldShares, status } = swapContract;

    return (
        <Flex justify="center" align="center" minH="100vh">
            <Box p={8} shadow="xl" bg={colors.offBlack} borderWidth="1px" borderRadius="lg" maxW="800px" w="100%">
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Text color={colors.offWhite} fontSize="3xl" fontWeight="bold">{getFeedLabel(legA.feedId)}</Text>
                    <Badge colorScheme="blue" mb={3} fontSize="lg">{`Contract: ${contractMasterId} - ${contractId}`}</Badge>
                    <Text color={colors.offWhite} fontSize="3xl" fontWeight="bold">{getFeedLabel(legB.feedId)}</Text>
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
                            <Text color={colors.lightBlue[200]} fontSize="xl" mb={2}><strong>User A:</strong> {formatAddress(userA)}</Text>
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
                    <Button w={200} bg={colors.offWhite} color={colors.offBlack} onClick={() => handleWithdraw(swapContract, account as string)}>Withdraw</Button>
                </Flex>


                <Divider my={6} />

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

                <Flex justifyContent="center">
                    {renderStatusButton(swapContract, account as string)}
                </Flex>
            </Box>
        </Flex >
    );
}

export default ContractDetails;
