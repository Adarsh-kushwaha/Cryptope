import React from 'react';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';


const App = () => {

  return (
    <>
    <div className='max-w-xl m-auto'>
      <Navbar />
      <Welcome/>
    </div>
    </>
  );
};

export default App;

