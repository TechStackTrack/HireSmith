import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { Landing } from './components/Landing';
import { Form } from './components/Form';
import { MoreInfo } from './components/MoreInfo';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Link to="/"><Button variant="contained">Goodbye world</Button></Link>
  )
}

