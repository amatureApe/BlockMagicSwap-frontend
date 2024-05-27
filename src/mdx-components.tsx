import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import CreatePositionCard from '@/components/CreatePositionCard';

import { colors } from '@/components/styles/colors';

import type { MDXComponents } from 'mdx/types'
import { ReactNode } from 'react'

// const bgColor = useColorModeValue(colors.darkGray, 'gray.100');
// const textColor = useColorModeValue(colors.offWhite, 'white');

export function useMDXComponents(components: MDXComponents): MDXComponents {

    return {
        // H1: ({ children }: { children: ReactNode }) => <h1 color={colors.lightBlue[100]} className="text-2xl font-bold">{children}</h1>,
        // H2: ({ children }: { children: ReactNode }) => <h2 color={colors.lightBlue[100]} className="text-xl font-bold">{children}</h2>,
        // h1: ({ children }) => <h1 color={colors.lightBlue[100]} style={{ fontSize: '10px' }}>{children}</h1>,
        ...components,
    }
}
