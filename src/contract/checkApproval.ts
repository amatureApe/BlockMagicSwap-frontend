import { ethers, BigNumber } from 'ethers';
import erc20ABI from './abis/ERC20.json';
import contractConnection from './contractConnection';

export const checkApproval = async (token: string, spender: string, accounts: string, amount: number): Promise<boolean> => {
    const contract = await contractConnection({ address: token, abi: erc20ABI });
    if (!contract) {
        console.error('Failed to connect to contract.');
        return false;
    }

    const allowance = await contract.allowance(accounts, spender);
    return allowance.gt(BigNumber.from(amount));
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
