// components/CardsWrap.js
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const CardsWrap = ({ contracts }) => {
    return (
        <Box>
            {contracts.map((contract, index) => (
                <Box key={index} p={5} shadow='md' borderWidth='1px'>
                    <Text mt={2}>Contract #{contract.contractId}</Text>
                    <Text mt={2}>Status: {contract.status}</Text>
                    <Text mt={2}>Amount: {contract.notionalAmount}</Text>
                </Box>
            ))}
        </Box>
    );
};

export default CardsWrap;
