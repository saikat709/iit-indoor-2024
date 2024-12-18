// import logo from './logo.svg';
import './App.css';

import BasicRoutes from './routes/Basicroutes';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FecthProvider } from './context/hooks/usefetch';

function App() {

  return (
    <FecthProvider>
      <div className='dark'>
        <BasicRoutes />
        <ToastContainer />
      </div>
    </FecthProvider>
  );
}

export default App;
