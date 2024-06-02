"use client"

import React, { useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import { useRouter } from 'next/navigation';
import { BigNumber } from 'ethers';

import { Box, Text, Badge, Divider, Flex, Tooltip, Button } from '@chakra-ui/react';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { colors } from './styles/colors';
import { feedOptions, yieldOptions, tokenOptions } from './utils/selectOptions';

import contractConnection from '@/contract/contractConnection';
import { checkApproval, approve } from '@/contract/checkApproval';
import { addresses } from '@/contract/addresses';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { getTokenAddress, getFeedLabel, getTokenLabel, getYieldLabel, getEndDate, formatAddress, formatDate, getStatusProps, getCurrentAddresses } from '@/utils/helperFunctions';
import { useToast } from '@chakra-ui/react';

interface CardsWrapProps {
    contracts: SwapContract[];
    status: string | null;
    myPosition: boolean;
}

const CardsWrap: React.FC<CardsWrapProps> = ({ contracts, status, myPosition }) => {
    const router = useRouter();
    const { account, currentChain } = useContext(AccountContext);

    const toast = useToast();

    const currentAddresses = getCurrentAddresses(currentChain);
    const { cryptoSwap: cryptoSwapAddr } = currentAddresses.contracts;

    const handleCardRoute = (contract: SwapContract) => {
        router.push(`/market/${contract.contractMasterId}/${contract.contractId}`);
    };

    const handlePairSwap = async (contract: SwapContract, account: string) => {

        const contractInstance = await contractConnection({ address: cryptoSwapAddr, abi: cryptoSwapAbi });

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

        if (contractInstance) {
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
                const swapTx = await contractInstance.pairSwap(contract.contractMasterId, contract.contractId);
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
                size="sm"
                w={150}
                isDisabled={contract.status.toString() !== '0'}
                colorScheme={statusProps.colorScheme}
                onClick={() => handlePairSwap(contract, account)}
            >
                {buttonText}
            </Button>
        );
    };


    return (
        <Flex flexWrap="wrap" ml={24}>
            {contracts.filter(contract =>
                (!myPosition || contract.userA === account) &&
                (status === null || contract.status.toString() === status)
            ).map((contract, index) => (
                <Box key={index} p={4} shadow="md" backgroundColor={colors.offBlack} borderWidth="1px" borderRadius="lg" m={2} width="300px">
                    <Flex justifyContent="space-between">
                        <Text color={colors.offWhite} fontSize="xl" fontWeight="bold">{getFeedLabel(contract.legA.feedId)}</Text>
                        <Badge colorScheme={getStatusProps(contract.status.toString()).colorScheme} mb={3}>
                            {getStatusProps(contract.status.toString()).label}
                        </Badge>
                        <Text color={colors.offWhite} fontSize="xl" fontWeight="bold">{getFeedLabel(contract.legB.feedId)}</Text>
                    </Flex>
                    <Divider mb={2} />

                    <Flex justify="space-between">
                        <Tooltip label={contract.userA} aria-label="Full address">
                            <Text color={colors.lightBlue[200]} mt={1}><strong>User A:</strong> {formatAddress(contract.userA)}</Text>
                        </Tooltip>
                        <Tooltip label={contract.userB} aria-label="Full address">
                            <Text color={colors.lightBlue[200]} mt={1}><strong>User B:</strong> {formatAddress(contract.userB)}</Text>
                        </Tooltip>
                    </Flex>

                    <Divider my={2} />

                    <Text color={colors.lightBlue[200]} mt={1}><strong>Notional:</strong> {contract.notionalAmount.toLocaleString()}
                        <Tooltip label={getTokenAddress(contract.settlementTokenId)}>
                            <span>{' '}{getTokenLabel(contract.settlementTokenId)}</span>
                        </Tooltip>
                    </Text>

                    <Divider my={2} />

                    <Text color={colors.lightBlue[200]} mt={1}><strong>Start Date:</strong> {formatDate(contract.period.startDate).toString()}</Text>
                    <Text color={colors.lightBlue[200]} mt={1}><strong>End Date:</strong> {getEndDate(contract.period.startDate, contract.period.periodInterval, contract.period.totalIntervals)}</Text>
                    <Text color={colors.lightBlue[200]} mt={1}>
                        <strong>Interval: </strong>
                        <Tooltip label={`Total Intervals: ${contract.period.totalIntervals}`}>
                            <span>Every {contract.period.periodInterval / 86400} day(s)</span>
                        </Tooltip>
                    </Text>

                    <Divider my={2} />

                    <Text color={colors.lightBlue[200]} mt={1}><strong>Yield:</strong> {getYieldLabel(contract.yieldId)}</Text>

                    <Divider my={2} />

                    <Flex justifyContent="center" my={2}>
                        {renderStatusButton(contract, account as string)}
                    </Flex>

                    <Flex justifyContent="center">
                        <Text
                            size="sm"
                            cursor="pointer"
                            _hover={{ textDecoration: 'underline' }}
                            onClick={() => handleCardRoute(contract)}
                        >
                            Contract Details
                        </Text>
                    </Flex>
                </Box>
            ))}
        </Flex >
    );
};

export default CardsWrap;