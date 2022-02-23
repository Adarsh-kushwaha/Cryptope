import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { ShortenAdd } from '../utils/ShortenAdd'


const TransctionCard = ({ addressTo, addressFrom, amount, timestamp, url, message }) => {
    return (
        <div className='flex flex-row gap-2 w-full maxWidth-full m-auto py-4 justify-center items-start  px-6 rounded-xl shadow-lg bg-gray-50 my-4'>
            <div className='w-[50px]'>
                <img src="https://www.pngkit.com/png/detail/264-2645350_ethereum-coin-png-ethereum.png" alt={url} className='inline-block h-17 w-18 rounded-full'  />
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-between flex-wrap mb-2 '>
                    <p className='text-md font-semibold '>Sender: {ShortenAdd(addressFrom)}</p>
                    <p className='text-md font-semibold '>Reciever : {ShortenAdd(addressTo)}</p>
                </div>

                <div className='flex flex-col justify-between gap-2 flex-wrap'>
                    <div>
                        <p className='text-md text-gray-800 font-medium '>Timestamp : {timestamp}</p>
                        <p className='text-md text-gray-800 font-medium '>Message : {message}</p>

                    </div>
                    <div className='flex justify-end items-center gap-4'>
                        
                        <button className='border-green-400 p-2 px-6 rounded-md shadow-sm text-white font-bold justify-center items-center flex text-lg border-[2px] text-green-500'>
                            {amount} ether
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}


const Transaction = () => {
    const { currentAccount, transactions } = useContext(TransactionContext)

    return (
        <div className='w-full pt-6'>
            {currentAccount ? (<h3 className='text-center text-gray-700 my-6 text-2xl font-bold' >Your Latest Transactions</h3>) : (<h3 className='text-center text-gray-500 my-6 text-2xl font-bold'>Connect Account to see latest transactions</h3>)}

            <div className='grid gap-4 grid-cols-1 '>
                {transactions.reverse().map((trs, i) => (
                    <TransctionCard key={i} {...trs} />
                ))}
            </div>
        </div>
    )
}

export default Transaction