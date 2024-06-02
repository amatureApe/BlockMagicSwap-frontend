import { useEffect, useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountContext';
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import cryptoSwapAutomatedAbi from '@/contract/abis/CryptoSwapAutomated.json';
import { addresses } from '@/contract/addresses';
import contractConnection from '@/contract/contractConnection';
import { SwapContract } from '@/contract/interfaces/SwapContract';
import { getCurrentAddresses } from '@/utils/helperFunctions';

export const useSwapContracts = () => {
    const { account, currentChain } = useContext(AccountContext);
    const [swapContracts, setSwapContracts] = useState<SwapContract[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentChain) return; // Ensure currentChain is available before proceeding

        let isMounted = true; // to handle component unmounting
        const fetchContracts = async () => {
            setLoading(true); // Set loading to true as fetch begins

            const currentAddresses = getCurrentAddresses(currentChain);

            const abi = currentChain === 'arbitrum' ? cryptoSwapAbi : cryptoSwapAutomatedAbi;
            const contract = await contractConnection({
                address: currentAddresses.contracts.cryptoSwap, // Use dynamically fetched address
                abi: abi
            });

            if (!contract) {
                console.error("No valid contract found for current settings.");
                setLoading(false);
                return;
            }

            try {
                const masterId = await contract.contractMasterId();
                const allContracts = [];

                for (let masterIdCount = 0; masterIdCount < masterId.toNumber(); masterIdCount++) {
                    const creationCount = await contract.contractCreationCount(masterIdCount);
                    for (let contractId = 0; contractId < creationCount.toNumber(); contractId++) {
                        const swapContract = await contract.getSwapContract(masterIdCount, contractId);
                        if (isMounted) {
                            allContracts.push(swapContract);
                        }
                    }
                }

                if (isMounted) {
                    setSwapContracts(allContracts);
                }
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
            isMounted = false; // Set flag to false when component unmounts
        };
    }, [currentChain]); // Depend on currentChain to re-fetch when it changes

    return { swapContracts, loading };
};
