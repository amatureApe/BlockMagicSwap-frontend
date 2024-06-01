// hooks/useSwapContracts.ts
import { useEffect, useState, useContext } from 'react';
import { AccountContext } from '@/app/layout';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { addresses } from '@/contract/addresses';
import contractConnection from '@/contract/contractConnection';

interface Leg {
    legPosition: boolean;
    feedId: number;
    originalPrice: string;
    lastPrice: string;
    balance: number;
    withdrawable: number;
}

interface Period {
    startDate: number;
    periodInterval: number;
    totalIntervals: number;
    intervalCount: number;
}

interface SwapContract {
    contractMasterId: number;
    contractId: number;
    userA: string;
    userB: string;
    period: Period;
    legA: Leg;
    legB: Leg;
    settlementTokenId: number;
    yieldId: number;
    notionalAmount: number;
    yieldShares: number;
    status: 'OPEN' | 'ACTIVE' | 'SETTLED' | 'CANCELLED';
}

export const useSwapContracts = () => {
    const { account } = useContext(AccountContext);
    const [swapContracts, setSwapContracts] = useState<SwapContract[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // to handle component unmounting
        const fetchContracts = async () => {
            const contract = await contractConnection({
                address: addresses.arbitrum.contracts.cryptoSwap,
                abi: cryptoSwapAbi
            });

            if (!contract || !isMounted) return;

            setLoading(true);
            try {
                const masterId = await contract.contractMasterId();
                const allContracts: SwapContract[] = [];

                for (let masterIdCount = 0; masterIdCount < masterId.toNumber(); masterIdCount++) {
                    const creationCount = await contract.contractCreationCount(masterIdCount);
                    for (let contractId = 0; contractId < creationCount.toNumber(); contractId++) {
                        const swapContract = await contract.getSwapContract(masterIdCount, contractId);
                        allContracts.push(swapContract);
                    }
                }

                setSwapContracts(allContracts);
            } catch (error) {
                console.error('Failed to fetch contracts:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchContracts();
        return () => {
            isMounted = false;
        };
    }, [account]); // Dependency on account if you need to re-fetch when account changes

    return { swapContracts, loading };
};
