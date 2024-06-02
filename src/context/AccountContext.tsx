import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

interface AccountContextType {
    account: string | null;
    setAccount: (account: string | null) => void;
    connectAccount: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextType>({
    account: null,
    setAccount: () => { },
    connectAccount: async () => { },
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        const checkConnectedAccount = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
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

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
            provider.on('accountsChanged', handleAccountsChanged);

            return () => {
                provider.removeAllListeners('accountsChanged');
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
        <AccountContext.Provider value={{ account, setAccount, connectAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);