import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='flex flex-row justify-between my-6 pb-5 border-b-2 border-gray-500'>
        <div className='text-2xl font-bold'>Web 3.0</div>
        <div className='bg-[#161B22] text-gray-100 py-2 px-6 text-xl rounded-md cursor-pointer'><a href="https://github.com/Adarsh-kushwaha/Web-3.0" target="_blank" rel='noreferrer'>GitHub</a></div>
    </div>
    </>
  )
}

export default Navbar