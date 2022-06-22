import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CollapsibleTable } from './RenderTable';
import Button from '@mui/material/Button';

const cached = {
  difficulty: ['easy', 'medium', 'hard'],
  type: ['Behavioral', 'System Design', 'Algorithms'],
  company: ['Google', 'Meta', 'Amazon', ''],
};
export function Landing() {
  const [search, setSearch] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [specificSearch, setSpecificSearch] = useState('');
  const [parsedData, setParsedData] = useState([]);

  const handleSubmit = (e) => {
    console.log(search, specificSearch);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setOptionList(cached[event.target.value]);
  };

  const handleSpecificChange = (e) => {
    setSpecificSearch(e.target.value);
  };

  function landingQuery() {
    fetch('/router/questions')
      .then((res) => res.json())
      // .then(data => setParsedData(data))
      .then((data) => buildTable(data));
  }

  function buildTable(arr) {
    const uniqArr = [];
    const obj = {};

    for (const ele of arr) {
      if (!(ele._id in obj)) {
        obj[ele._id] = true;
        uniqArr.push(ele);
      }
    }

    setParsedData(uniqArr);
  }

  useEffect(() => {
    landingQuery();
  }, []);

  useEffect(() => {
    console.log('Data from database', parsedData);
  }, [parsedData]);

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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.isArray(optionList) &&
            optionList.map((ele) => {
              return <MenuItem value={ele}>{ele}</MenuItem>;
            })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 3, minWidth: 200 }}>
        <Button variant="contained" onSubmit={handleSubmit}>
          Search
        </Button>
      </FormControl>
      <CollapsibleTable data={parsedData} />
    </div>
  );
}
