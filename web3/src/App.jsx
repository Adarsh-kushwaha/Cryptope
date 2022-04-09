import React from 'react';
import Navbar from './components/Navbar';
import Transaction from './components/Transaction';
import Welcome from './components/Welcome';


const App = () => {

  return (
    <>
      <div className='md:max-w-xl md:m-auto max-w-[95%] m-auto'>
        <Navbar />
        <Welcome />
        <Transaction />
      </div>
      <div className='text-center p-6 my-8 border-gray-700 text-gray-600 font-bold container'>
        <p className='underline text-lg'>Made By Adarsh Kushwaha</p>
      </div>
    </>
  );
};

export default App;

