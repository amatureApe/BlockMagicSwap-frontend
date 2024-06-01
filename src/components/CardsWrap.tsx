import React from 'react';
import { Box, Text, Badge, Divider, Flex } from '@chakra-ui/react';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { colors } from './styles/colors';

interface CardsWrapProps {
    contracts: SwapContract[];
    status: string | null;
}

const CardsWrap: React.FC<CardsWrapProps> = ({ contracts, status }) => {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString("en-US");
    };

    return (
        <Flex flexWrap="wrap" ml={24}>
            {contracts.map((contract, index) => (
                (status === null || contract.status.toString() === status) && (
                    <Box key={index} p={4} shadow="md" backgroundColor={colors.offBlack} borderWidth="1px" borderRadius="lg" m={2} width="300px">
                        <Flex justifyContent="space-between">
                            <Text color={colors.offWhite} fontSize="xl" fontWeight="bold">{contract.legA.feedId.toString()}</Text>
                            <Text color={colors.offWhite} fontSize="xl" fontWeight="bold">{contract.legB.feedId.toString()}</Text>
                        </Flex>
                        <Badge colorScheme={contract.status.toString() === '1' ? 'green' : 'red'} ml="1" mb={2}>
                            {contract.status}
                        </Badge>
                        <Divider mb={2} />

                        <Text color={colors.lightBlue[200]} mt={1}><strong>User A:</strong> {contract.userA.toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>User B:</strong> {contract.userB.toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Settlement Token ID:</strong> {contract.settlementTokenId.toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Yield ID:</strong> {contract.yieldId.toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Notional Amount:</strong> ${contract.notionalAmount.toLocaleString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Yield Shares:</strong> {contract.yieldShares.toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Start Date:</strong> {formatDate(contract.period.startDate).toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Interval:</strong> Every {(contract.period.periodInterval / 86400).toString()} day(s)</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Total Intervals:</strong> {contract.period.totalIntervals.toString()}</Text>
                        <Text color={colors.lightBlue[200]} mt={1}><strong>Current Interval:</strong> {contract.period.intervalCount.toString()}</Text>
                    </Box>
                )
            ))}
        </Flex>
    );
};

export default CardsWrap;
