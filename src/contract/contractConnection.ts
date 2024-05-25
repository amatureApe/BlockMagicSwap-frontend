import { ethers } from 'ethers';

interface ContractConnectionParams {
    address: string;
    abi: any[];
}

const contractConnection = async ({ address, abi }: ContractConnectionParams): Promise<ethers.Contract | undefined> => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            address,
            abi,
            signer
        );
        return contract;
    } else {
        return undefined;
    }
};

export default contractConnection;
