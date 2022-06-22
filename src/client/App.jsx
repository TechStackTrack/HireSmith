import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { Landing } from './components/Landing';
import { Form } from './components/Form';
import { MoreInfo } from './components/MoreInfo';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/form" element={<Form />} />
          <Route path="/:questionid" element={<MoreInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
