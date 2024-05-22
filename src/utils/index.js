import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { ChatAppAddress, ChatAppABI } from '../context/Constants';

// Check if the wallet is connected
export const CheckIfWalletConnected = async () => {
    try {
        if (!window.ethereum) {
            console.log("Wallet not installed.");
            return null;
        }
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length === 0) {
            console.log("Wallet connected but no accounts found.");
            return null;
        }

        return accounts[0];
    } catch (error) {
        console.error("Error checking wallet connection:", error);
        return null;
    }
};

// Connect wallet
export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            console.log("Wallet not installed.");
            return null;
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
            console.log("Wallet connected but no accounts found.");
            return null;
        }

        return accounts[0];
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
};

// Fetch the contract instance
const fetchContract = async (signerOrProvider) => {
    return new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);
};

// Connect with the contract
export const connectingWithContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);

        const signer = await provider.getSigner();
        const contract = await fetchContract(signer);
        return contract;
    } catch (error) {
        console.error("Error connecting with contract:", error);
        return null;
    }
};

// Convert time utility function
export const convertTime = (time) => {
    // Assuming 'time' is a BigNumber from ethers.js
    const newTime = new Date(time.toNumber() * 1000); // Convert from seconds to milliseconds

    // Extract components of the date
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    const seconds = newTime.getSeconds();

    // Format components to ensure two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Construct the real-time string
    const realTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // Optionally, you can also include the date
    const day = newTime.getDate();
    const month = newTime.getMonth() + 1; // Months are zero-indexed
    const year = newTime.getFullYear();

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    const fullDateTime = `${formattedDay}-${formattedMonth}-${year} ${realTime}`;

    return fullDateTime;
};
