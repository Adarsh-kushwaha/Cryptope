import React, {useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { ShortenAdd } from '../utils/ShortenAdd';
import Loader from './Loader';


const Input = ({ placeholder, type, name, value, handleChange }) => {
    return <input type={type} value={value} placeholder={placeholder} step="0.001" onChange={(e) => handleChange(e, name)} className="py-3 px-4 mx-2 w-full bg-gray-200 outline-none text-gray-800 font-semibold rounded-sm" />
}

const Welcome = () => {


    const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext)

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;
        e.preventDefault();

        if (addressTo || amount || keyword || message) {
            return sendTransaction()
        }
    }

    return (
        <div className='mt-8'>
            {!currentAccount && <button
                type="button"
                className='w-full bg-green-500 text-gray-100 py-4 px-6 text-xl rounded-md cursor-pointer hover:bg-green-700 text-center rounded-md'
                onClick={connectWallet}
            >
                Connect To Wallet
            </button>}
            {currentAccount && <p className='text-center text-green-600 my-6 text-2xl font-bold'> ✅ You are connected to your wallet</p>}
            {currentAccount && <p className='text-center text-gray-600 my-6 text-lg font-semibold'>Address : {ShortenAdd(currentAccount)}</p>}

            <div className='w-full p-4 mt-8 grid grid-rows grid-cols-1 gap-4 '>
                <h2 className='text-xl font-bold'>Transaction Form</h2>
                <form className='grid grid-rows grid-cols-1 gap-4'>
                    <Input placeholder="Address To" type="text" handleChange={handleChange} name="addressTo" />
                    <Input placeholder="Ether (Amt)" type="number" handleChange={handleChange} name="amount" />
                    <Input placeholder="Quote" type="text" handleChange={handleChange} name="keyword" />
                    <Input placeholder="Message" type="text" handleChange={handleChange} name="message" />

                    {isLoading ? <Loader /> : <button
                        type="button"
                        className='w-full bg-blue-400 text-gray-100 py-2 px-4 text-xl rounded-md cursor-pointer hover:bg-blue-500 text-center rounded-md mx-2'
                        onClick={handleSubmit}
                    >Send Now</button>}

                </form>
            </div>
            
        </div>
    )
}

export default Welcome