import React, { useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import { BigNumber, ethers } from 'ethers';

import { Box, Flex, Text, Input, Select, Button, Collapse, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Alert, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { colors } from './styles/colors';
import contractConnection from '@/contract/contractConnection';
import { checkApproval, approve } from '@/contract/checkApproval';
import { addresses } from '@/contract/addresses';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { feedOptions, periodOptions, tokenOptions, yieldOptions } from './utils/selectOptions';

const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString();

const CreatePositionCard: React.FC = () => {
    const { account } = useContext(AccountContext);

    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // contract state
    const [contractCreationCount, setContractCreationCount] = useState<number | null>(1);
    const [notionalAmount, setNotionalAmount] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<number>(0);
    const [feedIdA, setFeedIdA] = useState<number | null>(null);
    const [feedIdB, setFeedIdB] = useState<number | null>(null);
    const [periodInterval, setPeriodInterval] = useState<number | null>(null);
    const [totalIntervals, setTotalIntervals] = useState<number | null>(1);
    const [settlementTokenId, setSettlementTokenId] = useState<number | null>(null);
    const [yieldId, setYieldId] = useState<number | null>(0);
    const [chainlinkAutomation, setChainlinkAutomation] = useState<boolean | null>(null);

    const toast = useToast();

    const handleNumericChange = (value: string, setState: React.Dispatch<React.SetStateAction<number | null>>) => {
        const numValue = Number(value);
        if (!isNaN(numValue) && value.trim() !== '') {
            setState(numValue);
        } else {
            setState(null);
        }
    };

    // Ensure that inputs are numbers before converting
    const handleInputNumericChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number | null>>) => {
        const value = e.target.value.trim();
        if (value === "") {
            setState(null);
        } else {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                setState(numValue);
            }
        }
    };

    const handleDateChange = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00Z'); // Append 'T00:00:00Z' to set time to 00:00 UTC
        setStartDate(date.getTime()); // Convert the date to a timestamp and update state
    };

    const checkFields = () => {
        const isValidInput = (value: any): boolean => value !== null && value !== undefined;

        if (!isValidInput(contractCreationCount) || !isValidInput(notionalAmount) || !isValidInput(startDate) ||
            !isValidInput(feedIdA) || !isValidInput(feedIdB) || !isValidInput(periodInterval) ||
            !isValidInput(totalIntervals) || !isValidInput(settlementTokenId)) {

            toast({
                title: "Error",
                description: "Please ensure all fields are filled correctly before creating the position.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top",
            });
            return false;
        }
        return true;
    };


    const handleOpenSwap = async () => {
        const fieldsAreValid = checkFields();
        if (!fieldsAreValid) return;

        setError("");
        setIsLoading(true);

        const settlementTokenAddress = tokenOptions.find(o => o.value === settlementTokenId)?.address;
        const spenderAddress = addresses.arbitrum.contracts.cryptoSwap;

        try {
            // Check if the user has already approved the settlement token for the contract
            if (settlementTokenAddress !== undefined && account !== null && notionalAmount !== null) {
                const isApproved = await checkApproval(settlementTokenAddress, spenderAddress, account, notionalAmount);
                if (!isApproved) {

                    toast({
                        title: "Approval Required",
                        description: "Please approve the token to continue with creating the swap.",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });

                    // If not approved, ask for approval
                    await approve(settlementTokenAddress, spenderAddress);

                    toast({
                        title: "Approval Successful",
                        description: "Token has been approved for the contract.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                }
            }

            // After approval, proceed to create the swap
            const contract = await contractConnection({
                address: addresses.arbitrum.contracts.cryptoSwap,
                abi: cryptoSwapAbi
            });

            console.log(startDate)

            if (contract) {
                const tx = await contract.openSwap(
                    BigNumber.from(contractCreationCount),
                    BigNumber.from(notionalAmount),
                    BigNumber.from(startDate / 1000), // convert from milliseconds to timestamp
                    BigNumber.from(feedIdA),
                    BigNumber.from(feedIdB),
                    BigNumber.from(periodInterval),
                    BigNumber.from(totalIntervals),
                    BigNumber.from(settlementTokenId),
                    BigNumber.from(yieldId)
                );
                console.log("Transaction hash:", tx.hash);
                await tx.wait();
                console.log("Transaction confirmed");
            } else {
                throw new Error("Contract not connected");
            }
        } catch (err) {
            console.error("Error during transaction:", err);
            setError("Transaction failed: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsLoading(false);
        }
    };


    const summaryText = () => {
        let baseText = `This position involves creating ${contractCreationCount || 'a specified number of'} contract(s) for a synthetic equity swap between ${feedOptions.find(o => o.value === feedIdA)?.label || 'Leg A'}  \n 
        and ${feedOptions.find(o => o.value === feedIdB)?.label || 'Leg B'}, starting on ${startDate ? formatDate(startDate) : 'your selected date'}. The settlement token is ${tokenOptions.find(o => o.value === settlementTokenId)?.label || 'your chosen currency'}, \n
        with a notional value of ${notionalAmount || 'specified amount'}. The swap occurs over ${Number(totalIntervals) > 1 ? totalIntervals : 'a number of'} ${periodOptions.find(o => o.value === periodInterval)?.label.toLowerCase() || 'your selected period'} intervals. `;

        if (totalIntervals && periodInterval) {
            baseText += ` This means that your position will end in ${totalIntervals} ${periodOptions.find(o => o.value === periodInterval)?.label.toLowerCase().slice(0, -2) + '(s)'}, updating the position and distributing winnings at the end of each interval.`;
        }

        if (yieldId) {
            baseText += ` your position may also return yield based on ${yieldOptions.find(o => o.value === yieldId)?.label}'s performance.`;
        }

        baseText += ` Please review the details and click 'Create' to open the position. For more information please refer to our documentation.`;

        return baseText;
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
                        <NumberInput
                            value={contractCreationCount ?? 1}
                            min={1}
                            onChange={(valueString) => handleNumericChange(valueString, setContractCreationCount)}
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

                <Flex direction="column" gap={4}>
                    <Flex justifyContent="center">
                        <Text fontSize="md" color={colors.lightBlue[200]}>Summary</Text>
                    </Flex>
                    <Text fontSize="md" color="white" w={500}>
                        {summaryText()}
                    </Text>
                    <Flex justifyContent="center">
                        <Button
                            onClick={handleOpenSwap}
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
            </Flex >
        </Flex >
    );
};

export default CreatePositionCard;
