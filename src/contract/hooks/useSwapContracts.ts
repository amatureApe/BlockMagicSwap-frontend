import { useEffect, useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { addresses } from '@/contract/addresses';
import contractConnection from '@/contract/contractConnection';
import { SwapContract } from '@/contract/interfaces/SwapContract';

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
