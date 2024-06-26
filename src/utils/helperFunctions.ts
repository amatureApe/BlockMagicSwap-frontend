import { yieldOptions } from "@/components/utils/selectOptions";
import { addresses } from "@/contract/addresses";

interface FeedOption {
    value: number;
    label: string;
}

interface TokenOption {
    value: number;
    label: string;
    address: string;
}

export const getFeedLabel = (feedOptions: FeedOption[], feedId: number): string => {
    const feed = feedOptions.find(option => option.value === feedId);
    return feed ? feed.label : 'Unknown';
};

export const getTokenLabel = (tokenOptions: TokenOption[], tokenId: number): string => {
    const token = tokenOptions.find(option => option.value === tokenId);
    return token ? token.label : 'Unknown';
}

export const getTokenAddress = (tokenOptions: TokenOption[], tokenId: number): string => {
    const token = tokenOptions.find(option => option.value === tokenId);
    return token ? token.address : 'Unknown';
};

export const getYieldLabel = (yieldId: number): string => {
    const yieldOption = yieldOptions.find(option => option.value === yieldId);
    return yieldOption ? yieldOption.label : 'Unknown';
}
export const getEndDate = (startDate: number, periodInterval: number, totalIntervals: number): string => {
    return new Date(startDate * 1000 + periodInterval * totalIntervals * 1000).toLocaleDateString("en-US");
};

export const formatAddress = (address: string) => `${address.slice(0, 5)}...${address.slice(-4)}`;

export const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US");
};

export const getStatusProps = (status: string) => {
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

// @ts-ignore
export const getCurrentAddresses = (chain) => addresses[chain]; // Default to Arbitrum if not specified
