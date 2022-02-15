import React, { useState } from 'react'

const Input = ({ placeholder, type, name, value, handleChange }) => {
    return <input type={type} value={value} placeholder={placeholder} step="0.001" onChange={(e) => handleChange(e, name)} className="py-3 px-4 mx-2 w-full bg-gray-200 outline-none text-gray-800 font-semibold rounded-sm" />
}

const Welcome = () => {

    const [isLoading, setIsLoading] = useState(false);

    const walletHandler = () => {

    }

    const handleSubmit =()=>{

    }

    return (
        <div className='mt-8'>
            <button
                type="button"
                className='w-full bg-green-500 text-gray-100 py-4 px-6 text-xl rounded-md cursor-pointer hover:bg-green-700 text-center rounded-md'
                onClick={walletHandler}
            >
                Connect To Wallet
            </button>
            <div className='w-full p-4 mt-8 grid grid-rows grid-cols-1 gap-4 '>
                <h2 className='text-xl font-bold'>Transaction Form</h2>
                <form className='grid grid-rows grid-cols-1 gap-4'>
                    <Input placeholder="Address To" type="text" handleChange={() => { }} name="Address To" />
                    <Input placeholder="Ether (Amt)" type="number" handleChange={() => { }} name="amount" />
                    <Input placeholder="Keyword (gif)" type="text" handleChange={() => { }} name="keyword" />
                    <Input placeholder="Message" type="text" handleChange={() => { }} name="message" />
                
                    {isLoading === false ? <button
                        type="button"
                        className='w-full bg-blue-400 text-gray-100 py-2 px-4 text-xl rounded-md cursor-pointer hover:bg-blue-500 text-center rounded-md mx-2'
                        onClick={handleSubmit}
                    >Send Now</button> : <p>Loading..</p>}
                    
                </form>
            </div>
        </div>
    )
}

export default Welcome