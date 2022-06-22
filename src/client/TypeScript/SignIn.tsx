import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function SignIn() {
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    console.log(
      `Username is ${userInput.username}, password is ${userInput.password}`
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          HireSmith
        </Typography>
        <TextField
          id="outlined-search"
          label="Username"
          type="search"
          value={userInput.username}
          name="username"
          onChange={handleChange}
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={userInput.password}
          name="password"
          onChange={handleChange}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmit}>
          Sign In
        </Button>
      </CardActions>
    </Card>
  );
}
