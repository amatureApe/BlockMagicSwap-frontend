import { useState } from 'react';

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

    const toggleAdvanced = () => {
        setShowAdvanced(!showAdvanced);
    }

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriod(e.target.value);
    };

    const handleIntervalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIntervals(value === "" ? "" : Number(value));
    };

    const handleOpenSwap = async () => {
        const contract = await contractConnection({ address: addresses.arbitrum.contracts.cryptoSwap, abi: cryptoSwapAbi })
        if (!contract) {
            console.error("Contract not connected");
            return;
        }

        const tx = await contract.openSwap(
            currency,
            notional,
            startDate,
            period,
            intervals,
            amplifier,
            fixDate,
            yieldValue,
            reserve
        );
        console.log("Transaction hash:", tx.hash);
    }

    return (
        <Flex align="center" justify="center" bg={colors.offBlack} rounded="md" boxShadow="xl" p={8}>
            <Flex direction="column" gap={4}>
                <Flex direction="column" borderBottom="2px solid" borderColor={colors.lightBlue[200]} pb={2}>
                    <Flex gap={8} justifyContent="space-between">
                        <Select value={feedIdA} onChange={(e) => setFeedIdA(e.target.value)} placeholder="Leg A" variant="filled" bg={colors.offBlack} color={colors.offWhite} />
                        <Box width="2px" bg={colors.lightBlue[200]} height="40px" />
                        <Select value={feedIdB} onChange={(e) => setFeedIdB(e.target.value)} placeholder="Leg B" variant="filled" bg={colors.offBlack} color={colors.offWhite} />
                    </Flex>
                </Flex>

                <Flex direction="column" gap={4}>
                    <Input placeholder="Contract Creation Count" value={contractCreationCount} onChange={(e) => setContractCreationCount(e.target.value)} />
                    <Input placeholder="Notional Amount" value={notionalAmount} onChange={(e) => setNotionalAmount(e.target.value)} />
                    <Input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <Select placeholder="Period Type" value={periodType} onChange={(e) => setPeriodType(e.target.value)} >
                        <option value="1">Weekly</option>
                        <option value="2">Monthly</option>
                        <option value="3">Quarterly</option>
                        <option value="4">Yearly</option>
                    </Select>
                    <Input placeholder="Total Intervals" value={totalIntervals} onChange={(e) => setTotalIntervals(e.target.value)} />
                    <Select placeholder="Settlement Token ID" value={settlementTokenId} onChange={(e) => setSettlementTokenId(e.target.value)} />
                    <Select placeholder="Yield ID" value={yieldId} onChange={(e) => setYieldId(e.target.value)} />
                </Flex>

                <Button onClick={handleOpenSwap} mt={4} backgroundColor={colors.lightBlue[200]} color={colors.offBlack} _hover={{ bg: colors.lightBlue[100] }}>
                    Create Swap
                </Button>
            </Flex>
        </Flex>
    );
};

export default CreatePositionCard;
