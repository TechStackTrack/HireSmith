import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import SignIn from './components/SignIn';
import { Box } from '@mui/system';

const App = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <SignIn />
      </Box>
    </>
  );
};

export default App;
