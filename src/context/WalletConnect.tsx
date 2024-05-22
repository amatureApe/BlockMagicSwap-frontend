// WalletContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
    account: string | null;
    setAccount: (account: string | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        const connectAccount = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
                    const accounts = await provider.send("eth_requestAccounts", []);
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                } catch (error) {
                    console.error("Failed to connect account:", error);
                }
            }
        };

        connectAccount();

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

    return (
        <WalletContext.Provider value={{ account, setAccount }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};