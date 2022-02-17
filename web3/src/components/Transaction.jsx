import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import DummyData from '../utils/DummyData'
import { ShortenAdd } from '../utils/ShortenAdd'


const TransctionCard = ({ addressTo, addressFrom, amount, timestamp, url, message }) => {
    return (
        <div className='flex flex-col gap-8 maxWidth-full m-auto bg-green-20 py-6 justify-center items-start  px-6 rounded-md shadow-lg'>
            <div >
                <img src={url} alt="key" className='inline-block h-17 w-18 rounded-md' />
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
                    <div className='flex justify-end'>
                        <button className='bg-green-400 p-2 px-6 rounded-md shadow-sm text-white font-bold justify-center items-center flex text-lg'>
                            {amount} ether
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}


const Transaction = () => {
    const { currentAccount } = useContext(TransactionContext)

    return (
        <div className='w-full pt-6'>
            {currentAccount ? (<h3 className='text-center text-gray-700 my-6 text-2xl font-bold' >Your Latest Transactions</h3>) : (<h3 className='text-center text-gray-500 my-6 text-2xl font-bold'>Connect Account to see latest transactions</h3>)}

            <div className='grid gap-4 grid-cols-1 '>
                {DummyData.reverse().map((trs, i) => (
                    <TransctionCard key={i} {...trs} />
                ))}
            </div>
        </div>
    )
}

export default Transaction