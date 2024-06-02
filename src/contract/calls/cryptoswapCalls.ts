import { SwapContract } from "../interfaces/SwapContract";
import { addresses } from "../addresses";
import contractConnection from "../contractConnection";
import cryptoSwapAbi from '@/contract/abis/CryptoSwap.json';
import { checkApproval, approve } from "../checkApproval";
import { getTokenAddress } from "@/utils/helperFunctions";

export const handlePairSwap = async (contract: SwapContract, account: string) => {
    const cryptoSwapAddr = addresses.arbitrum.contracts.cryptoSwap;

    const cryptoSwap = await contractConnection({ address: cryptoSwapAddr, abi: cryptoSwapAbi });
    if (!cryptoSwap) {
        console.error('Failed to connect to contract.');
        return;
    }

    if (account) {
        const isApproved = await checkApproval(getTokenAddress(contract.settlementTokenId), cryptoSwapAddr, account, contract.notionalAmount);
        if (!isApproved) {
            await approve(getTokenAddress(contract.settlementTokenId), cryptoSwapAddr);
        }

        const swapTx = await cryptoSwap.pairSwap(contract.contractMasterId, contract.contractId);
        await swapTx.wait();
    }
}

export const handleWithdraw = async (contract: SwapContract, account: string) => {
    const cryptoSwapAddr = addresses.arbitrum.contracts.cryptoSwap;

    const cryptoSwap = await contractConnection({ address: cryptoSwapAddr, abi: cryptoSwapAbi });
    if (!cryptoSwap) {
        console.error('Failed to connect to contract.');
        return;
    }

    const withdrawTx = await cryptoSwap.withdrawWinnings(contract.contractMasterId, contract.contractId);
    await withdrawTx.wait();
}
