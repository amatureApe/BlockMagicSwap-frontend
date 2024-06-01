"use client"

import React, { useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import { BigNumber } from 'ethers';

import { Box, Text, Badge, Divider, Flex, Tooltip, Button } from '@chakra-ui/react';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { colors } from './styles/colors';
import { feedOptions, yieldOptions, tokenOptions } from './utils/selectOptions';

import contractConnection from '@/contract/contractConnection';
import { checkApproval, approve } from '@/contract/checkApproval';
import { addresses } from '@/contract/addresses';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';

interface CardsWrapProps {
    contracts: SwapContract[];
    status: string | null;
    myPosition: boolean;
}

const getStatusProps = (status: string) => {
    switch (status) {
        case '0':
            return { label: 'OPEN', colorScheme: 'blue' };
        case '1':
            return { label: 'ACTIVE', colorScheme: 'green' };
        case '2':
            return { label: 'SETTLED', colorScheme: 'purple' };
        case '4':
            return { label: 'CANCELED', colorScheme: 'red' };
        default:
            return { label: 'UNKNOWN', colorScheme: 'gray' };
    }
};

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




const getFeedLabel = (feedId: number): string => {
    const feed = feedOptions.find(option => option.value === feedId);
    return feed ? feed.label : 'Unknown';
};

const getTokenLabel = (tokenId: number): string => {
    const token = tokenOptions.find(option => option.value === tokenId);
    return token ? token.label : 'Unknown';
}

const getTokenAddress = (tokenId: number): string => {
    const token = tokenOptions.find(option => option.value === tokenId);
    return token ? token.address : 'Unknown';
}

const getYieldLabel = (yieldId: number): string => {
    const yieldOption = yieldOptions.find(option => option.value === yieldId);
    return yieldOption ? yieldOption.label : 'Unknown';
}

const getEndDate = (startDate: number, periodInterval: number, totalIntervals: number): string => {
    return new Date(startDate * 1000 + periodInterval * totalIntervals * 1000).toLocaleDateString("en-US");
};

const formatAddress = (address: string) => `${address.slice(0, 5)}...${address.slice(-4)}`;

const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US");
};

const handlePairSwap = async (contract: SwapContract, account: string) => {
    const cryptoSwapAddr = addresses.arbitrum.contracts.cryptoSwap;

    const cryptoSwap = await contractConnection({ address: cryptoSwapAddr, abi: cryptoSwapAbi });
    if (!cryptoSwap) {
        console.error('Failed to connect to contract.');
        return;
    }

    if (account) {
        const isApproved = await checkApproval(getTokenAddress(contract.settlementTokenId), cryptoSwapAddr, account, contract.notionalAmount);
        if (!isApproved) {
            await approve(getTokenAddress(contract.settlementTokenId), cryptoSwapAddr);
        }

        const swapTx = await cryptoSwap.pairSwap(contract.contractMasterId, contract.contractId);
        await swapTx.wait();
    }
}


const CardsWrap: React.FC<CardsWrapProps> = ({ contracts, status, myPosition }) => {
    const { account } = useContext(AccountContext);

    return (
        <Flex flexWrap="wrap" ml={24}>
            {contracts.filter(contract =>
                (!myPosition || contract.userA.toLowerCase() === account) &&
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

                    <Flex justifyContent="center">
                        {renderStatusButton(contract, account as string)}
                    </Flex>
                </Box>
            ))}
        </Flex >
    );
};

export default CardsWrap;
