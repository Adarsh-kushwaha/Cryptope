import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/Contant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please Install Metamask");
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            console.log(accounts);

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found")
            }
        } catch (error) {
            console.log(error);
            throw new error("No ethereum object found!")
        }


    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please Install Metamask");
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts);
        } catch (error) {
            console.log(error);
            throw new error("No ethereum object found!")
        }

    }


    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert("Please Install Metamask");
            }

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
            setIsLoading(true);
            console.log(`loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());



        } catch (error) {

        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])


    return (
        <TransactionContext.Provider value={{
            connectWallet: connectWallet,
            currentAccount: currentAccount,
            formData: formData,
            sendTransaction: sendTransaction,
            handleChange: handleChange
        }}>
            {children}
        </TransactionContext.Provider>
    )
}