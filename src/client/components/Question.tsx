import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, TextField, Button } from '@mui/material';

export function Question() {
  
  // question: object = {type, difficulty, round, comment, prompt}
  const [question, setQuestion] = useState();

  return (
    <Fragment>
      <TextField id="outlined-basic" label="Question" variant="outlined" />
      <TextField id="outlined-basic" label="Type" variant="outlined" />
      <TextField id="outlined-basic" label="Difficulty" variant="outlined" />
      <TextField id="outlined-basic" label="Round" variant="outlined" />
      <TextField id="outlined-basic" label="Comment" variant="outlined" />
      <TextField id="outlined-basic" label="Prompt" variant="outlined" />
      <Button variant="contained">Save</Button>
    </Fragment>
  )

  
}