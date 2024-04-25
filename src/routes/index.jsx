import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import Tables from '../screens/Home/Table/Tables';

const Root = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Tables />} />
        <Route path='/add' element={<Home />} />
      </Routes>
    </div>
  );
};

export default Root;
