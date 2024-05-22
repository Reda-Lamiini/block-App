import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { ChatAppAddress, ChatAppABI } from './Constants';

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                setupContract();
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            setupContract();
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const setupContract = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(connection);
            const signer =await provider.getSigner();
            const contract =await new ethers.Contract(ChatAppAddress, ChatAppABI, signer);
            console.log(contract);
            setContract(contract);
        } catch (error) {
            console.error("Error setting up contract:", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <ChatAppContext.Provider value={{ currentAccount, connectWallet, contract }}>
            {children}
        </ChatAppContext.Provider>
    );
};
