import React from 'react';
import { Heading, Stack, Text, VStack, Link, OrderedList, ListItem, UnorderedList, ListIcon, List, Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import Note from '@/components/Note';

const EducationPageContent = () => {
    return (
        <>
            <VStack flex={1} p={4} display="flex" justifyContent="center">
                <Stack spacing={6} w="container.md" textAlign="left">
                    <Heading id="introduction" as='h2' size='3xl' noOfLines={1}> Panda Finance </Heading>
                    <Text>
                        <b>Panda Finance</b> brings traditional finance swaps to the blockchain,
                        making those financial instruments accessible to a broader audience.
                        Panda Finance exposes a wider range of assets, including both crypto and traditional assets.
                    </Text>
                    <Heading id="whatIsASwap" as='h2' size='xl' noOfLines={1}> What is a Swap in Finance?  </Heading>
                    <Note>
                        A <b>financial swap</b> is a derivative contract between two parties which involves an exchange
                        of cash flow based on a predetermined <b>notional principal amount</b> (aka <b>notional value</b> or <b>notional</b>),
                        One cash flow is generally fixed, while the other is variable and based on a benchmark interest rate, floating currency exchange rate, or index price.
                        <Box as="br" />
                        <Box as="br" />
                        Reference: <Link href='https://www.investopedia.com/terms/s/swap.asp'>swaps-finance</Link>
                    </Note>

                    <Heading id="pros" as='h2' size='xl'> Advantages of Panda Finance </Heading>
                    <Heading as='h3' size='lg'> No clearing house, No expensive Fees </Heading>
                    <Text>
                        Every deals are hardcoded into the swap contract, ensuring execution according to the code and eliminating the need
                        for clearing house. This leads to lower fees.
                    </Text>
                    <Heading as='h3' size='lg'> Low Barrier to Entry </Heading>
                    <Text>
                        Panda Finance makes it easy for everyone to use these tools. Users can start with a minimal deposit, unlike
                        traditional derivatives finance tools that often require significant capital and are typically used by large
                        companies.
                    </Text>
                    <Heading as='h3' size='lg'> Yield on deposit </Heading>
                    <Text>
                        Panda Finance allows to earn a yield on the amount deposed for the swap contract.
                    </Text>
                    <Heading as='h3' size='lg'> Support More Assets </Heading>

                    <Text>
                        Traditional financial swaps typically involve exchange of fixed interest rates with floating interest rates,
                        the return of an asset (e.g., Alphabet Inc. stock quote), commodities or fiat currencies.
                        Panda Finance add cryptocurrencies to the list.
                    </Text>
                    <Heading id="#howItWorks" as='h2' size='xl'> How PandaFi works? </Heading>
                    <OrderedList styleType="''">

                        <ListItem> <Heading as='h3' size='lg'>1. Creation or selection of a Swap contract</Heading>
                            <List>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        Users can open a swap contract or select an opened contract on the website.
                                    </Text>
                                </ListItem>
                            </List>
                        </ListItem>

                        <ListItem> <Heading as='h3' size='lg'>2. Creation of a Swap contract</Heading>
                            <List>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Select a Asset</b>: Choose an asset, such as ETH or BTC.
                                        worth $10 each.
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Select a Currency</b>: Select a settlement token such as <b>USDC</b>.
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Enter a Notional</b>: Input a notional amount for the contract.
                                    </Text>
                                    <Text><i><b>It must be a multiple of 10!</b></i></Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Input the # of contracts</b>: Input the number of contracts you would like to create.
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Pick a start date</b>: Choose a start date for the swap contract to begin.
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Choose a Period</b>: Choose a period Daily, Weekly, Monthly, Quarterly, or Yearly.
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        <b>Choose the # of intervals</b>: Choose how many times the period will be repeated.
                                    </Text>
                                </ListItem>
                            </List>
                        </ListItem>

                        <ListItem> <Heading as='h3' size='lg'>3. Withdraw Profits</Heading>
                            <List>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        After each period or at the swap's end, the winner can manually withdraw their profit.
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        Automated withdrawals are also supported if the option is selected.
                                    </Text>
                                </ListItem>
                            </List>
                        </ListItem>

                        <ListItem> <Heading as='h3' size='lg'>4. End of the contract</Heading>
                            <List>
                                <ListItem>
                                    <Text> <ListIcon as={ChevronRightIcon} color='green.500' />
                                        Parties receive back their deposit and yield profit.
                                    </Text>
                                </ListItem>
                            </List>
                        </ListItem>

                    </OrderedList>

                    <Heading id="#glossary" as='h2' size='xl'> Glossary </Heading>
                    <Heading as='h3' size='lg'> Participants </Heading>
                    <List>
                        <Text> <b>Opener/OrderMaker</b>: A user making an offer for a Swap contract.  </Text>
                        <ListItem>
                            <Text>
                                <ListIcon as={ChevronRightIcon} color='green.500' />
                                Can make an offer for a Swap contract.
                            </Text>
                        </ListItem>

                        <Text> <b>Pairer/OrderTaker</b>: A user joining an offer for a Swap Contract.  </Text>

                        <ListItem>
                            <Text>
                                <ListIcon as={ChevronRightIcon} color='green.500' />
                                Can take an offer for a Swap contract.
                            </Text>
                        </ListItem>

                        <Text> <b>EquitySwap</b>: The <i>smart</i> contract processing the Swap contract logic.  </Text>
                    </List>
                </Stack>
            </VStack >
        </>
    );
};

export default EducationPageContent;
