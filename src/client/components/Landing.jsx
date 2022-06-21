import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CollapsibleTable } from './RenderTable';


export function Landing() {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // function landingQuery() {
  //   fetch('/route/getQuestions')
  //     .then(res => {
  //       const parsed = res.json();
  //       return parsed;
  //     })
  // }

  function createData(question, type, difficulty) {
  return {
    question,
    type,
    difficulty,
    companies: [
      {
        companyName: 'Apple',
        interviewRound: '1',
      },
      {
        companyName: 'Meta',
        interviewRound: '2',
      },
    ],
  };
  }
  
  const parsed = [
    createData('bst-height', 'algorithms', 'easy'),
    createData('bst-breadth-first', 'algorithms', 'medium'),
    createData('bin-to-dec', 'algorithms', 'easy'),
    createData('event-emitter', 'algorithms', 'hard'),
];

  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel id="search-dropdown">Search</InputLabel>
        <Select
          labelId="search-dropdown"
          id="search-dropdown"
          value={search}
          label="Search"
          onChange={handleChange}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={'Difficulty'}>Difficulty</MenuItem>
          <MenuItem value={'Type'}>Type</MenuItem>
          <MenuItem value={'Company'}>Company</MenuItem>
        </Select>
        <CollapsibleTable data={parsed}/>
      </FormControl>
    </div>
  );
}