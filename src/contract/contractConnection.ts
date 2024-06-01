import { ethers } from 'ethers';

interface ContractConnectionParams {
    address: string;
    abi: any[];
}

const ARBITRUM_NETWORK_ID = 42161;

const contractConnection = async ({ address, abi }: ContractConnectionParams): Promise<ethers.Contract | undefined> => {
    if (window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const network = await provider.getNetwork();

            if (network.chainId !== ARBITRUM_NETWORK_ID) {
                console.error("Please connect to the Arbitrum network.");
                alert("Please switch to the Arbitrum network in your wallet.");
                return undefined;
            }

            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);
            return contract;
        } catch (error) {
            console.error("Error connecting to the network:", error);
            return undefined;
        }
    } else {
        console.error("Ethereum object not found, make sure you have MetaMask installed.");
        alert("Ethereum object not found, make sure you have MetaMask installed.");
        return undefined;
    }
};

export default contractConnection;
