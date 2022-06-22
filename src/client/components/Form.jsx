import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export function Form() {
  // company: object = {companyName, location}
  const [company, setCompany] = useState({
    companyName: '',
    location: ''
  });

/****************************************************************
 *                    COMPANY COMPONENT'S STATE                 *
 ***************************************************************/
  
  function handleCompanyChange(e) {
    setCompany(prevCompany => {
      return {
        ...prevCompany,
        [e.target.name] : e.target.value
      }
    })
  }

/****************************************************************
 *                   QUESTION COMPONENT'S STATE                 *
 ***************************************************************/
  
  // question: object = {type, difficulty, round, comment, prompt}
  const [question, setQuestion] = useState({
    question: '',
    type: '',
    difficulty: '',
    round: '',
    comment: '',
    prompt: ''
  });

  function handleQuestionChange(e) {
    setQuestion(prevQuestion => {
      return {
        ...prevQuestion,
        [e.target.name] : e.target.value
      }
    })
  }

/****************************************************************
 *                   BUTTONS - API                              *
 ***************************************************************/
  function companyResetButton() {
    setCompany({
      companyName: '',
      location: ''
    });
    setQuestion({
      question: '',
      type: '',
      difficulty: '',
      round: '',
      comment: '',
      prompt: ''
    });
  }
  function questionSaveButton() {
    fetch('/router/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(company)
    })
  }

  return (
    <Fragment>
      <TextField id="company-name" label="Company Name" variant="outlined" name='companyName' onChange={handleCompanyChange} value={company.companyName} />
      <TextField id="company-location" label="Location" variant="outlined" onChange={handleCompanyChange} name='location' value={company.location}/>
      <br></br>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={question.type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Algorithms'}>Algorithms</MenuItem>
          <MenuItem value={'TechStack'}>TechStack</MenuItem>
          <MenuItem value={'Behavioral'}>Behavioral</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={question.type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Easy'}>Easy</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'Hard'}>Hard</MenuItem>
        </Select>
      </FormControl>
          <TextField id="outlined-basic" label="Round" variant="outlined" />
          <TextField id="outlined-basic" label="Comment" variant="outlined" />
        <TextareaAutosize style={{ width: 200, height: 200 }} label="Prompt" variant="outlined" />
      <Button onClick={() => companyResetButton()} variant="contained">Reset</Button>
      <Button onClick={() => questionSaveButton()} variant="contained">Save</Button>
    </Fragment>
  );
}