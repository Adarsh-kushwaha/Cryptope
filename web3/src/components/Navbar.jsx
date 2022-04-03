import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='flex flex-row justify-between mt-4'>
        <div className='text-2xl font-bold'>Crypto Pe</div>
        <div className='bg-blue-500 text-gray-100 py-2 px-6 text-xl rounded-md cursor-pointer'>Login</div>
    </div>
    </>
  )
}

export default Navbar
