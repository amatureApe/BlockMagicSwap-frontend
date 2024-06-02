import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

interface AccountContextType {
    account: string | null;
    setAccount: (account: string | null) => void;
    connectAccount: () => Promise<void>;
    currentChain: string | null;
    setCurrentChain: (chain: string | null) => void;
}

export const AccountContext = createContext<AccountContextType>({
    account: null,
    setAccount: () => { },
    connectAccount: async () => { },
    currentChain: null,
    setCurrentChain: () => { },
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [currentChain, setCurrentChain] = useState<string | null>(null);

    useEffect(() => {
        const checkConnectedAccount = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }

                    const network = await provider.getNetwork();
                    setCurrentChain(network.name);
                } catch (error) {
                    console.error("Failed to check connected account:", error);
                }
            }
        };

        checkConnectedAccount();

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                setAccount(null);
            } else {
                setAccount(accounts[0]);
            }
        };

        const handleChainChanged = (chainId: string) => {
            const chainName = ethers.providers.getNetwork(parseInt(chainId, 16)).name;
            setCurrentChain(chainName);
        };

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
            provider.on('accountsChanged', handleAccountsChanged);
            provider.on('chainChanged', handleChainChanged);

            return () => {
                provider.removeAllListeners('accountsChanged');
                provider.removeAllListeners('chainChanged');
            };
        }
    }, []);

    const connectAccount = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
                await provider.send("eth_requestAccounts", []);
            } catch (error) {
                console.error("Failed to connect account:", error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature!');
        }
    };

    return (
        <AccountContext.Provider value={{ account, setAccount, connectAccount, currentChain, setCurrentChain }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);