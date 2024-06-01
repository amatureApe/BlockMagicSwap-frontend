import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface AccountContextType {
    account: string | null;
    setAccount: Dispatch<SetStateAction<string | null>>;
}

export const AccountContext = createContext<AccountContextType>({ account: null, setAccount: () => { } });

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};
