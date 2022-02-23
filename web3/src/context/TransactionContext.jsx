import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/Contant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();
                console.log(availableTransactions)

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please Install Metamask");
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No Account Found")
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found!")
        }
    }

    const checkIfTransactionExist = async () => {
        try {
            const transactionContract = createEthereumContract();
            const currentTransactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", currentTransactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found!")
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
            throw new Error("No ethereum object found!")
        }

    }


    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert("Please Install Metamask");
            }

            if (ethereum) {

                const { addressTo, amount, keyword, message } = formData;
                const transactionContract = createEthereumContract();
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
                window.location.reload()
            } else {
                console.log("No ethereum object");
            }

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, [transactionCount])


    return (
        <TransactionContext.Provider value={{
            connectWallet: connectWallet,
            currentAccount: currentAccount,
            formData: formData,
            sendTransaction: sendTransaction,
            handleChange: handleChange,
            transactionCount: transactionCount,
            transactions: transactions,
            isLoading: isLoading,
        }}>
            {children}
        </TransactionContext.Provider>
    )
}