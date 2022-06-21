import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CollapsibleTable } from './RenderTable';

const cached = {
  difficulty: ['easy', 'medium', 'hard'],
  type: ['Behavioral', 'System Design', 'Algorithms'],
  company: ['Google', 'Meta', 'Amazon', '']
}
export function Landing() {
  const [search, setSearch] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [specificSearch, setSpecificSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
    setOptionList(cached[event.target.value])
  };

  const handleSpecificChange = e => {
    console.log('specific is ', e.target.value)
    setSpecificSearch(e.target.value)
  }

  // function landingQuery() {
  //   fetch('/router/questions')
  //     .then(res => {
  //       const parsed = res.json();
  //       return parsed;
  //     })
  // }

  function createData(question, type, difficulty, prompt) {
  return {
    question,
    type,
    difficulty,
    prompt
  };
  }
  
  const parsed = [
    createData('bst-height', 'algorithms', 'easy', 'Given a binary tree, find its height.'),
    createData('bst-breadth-first', 'algorithms', 'medium', 'Given a binary tree, find its breadth-first traversal.'),
    createData('bin-to-dec', 'algorithms', 'easy', 'Given a binary number, convert it to decimal.'),
    createData('event-emitter', 'algorithms', 'hard', 'Create an event-emitter.'),
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
          <MenuItem value={'difficulty'}>Difficulty</MenuItem>
          <MenuItem value={'type'}>Type</MenuItem>
          <MenuItem value={'company'}>Company</MenuItem>
        </Select>
      </FormControl>
        {/* check if seach state is an empty string, if not look in cached and populate second drop down with array  */}
      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel id="specific-search-dropdown">Specific Search</InputLabel>
        <Select
          labelId="search-specific-dropdown"
          id="search-specific-dropdown"
          value={specificSearch}
          label="SpecificSearch"
          onChange={handleSpecificChange}
        >
        <MenuItem value=""><em>None</em></MenuItem>
          {Array.isArray(optionList) && optionList.map(ele => {
          return <MenuItem value={ele}>{ele}</MenuItem>
          })}
        </Select>
        </FormControl>
        <CollapsibleTable data={parsed}/>
    </div>
  );
}