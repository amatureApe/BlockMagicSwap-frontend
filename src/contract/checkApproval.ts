import { ethers } from 'ethers';
import erc20ABI from './abis/ERC20.json';
import contractConnection from './contractConnection';

// Define interface for the Ethereum account array and specify the types for token and spender as strings.
export const checkApproval = async (token: string, spender: string, accounts: string[]): Promise<boolean> => {
    const contract = await contractConnection({ address: token, abi: erc20ABI });
    if (!contract) {
        console.error('Failed to connect to contract.');
        return false;
    }

    const allowance = await contract.allowance(accounts[0], spender);
    return allowance.gt(0); // Using .gt(0) from BigNumber to correctly evaluate the allowance comparison.
};

export const approve = async (token: string, spender: string): Promise<void> => {
    const contract = await contractConnection({ address: token, abi: erc20ABI });
    if (!contract) {
        console.error('Failed to connect to contract.');
        return;
    }

    const approvalTx = await contract.approve(spender, ethers.constants.MaxUint256);
    await approvalTx.wait();
};
