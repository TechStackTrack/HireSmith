import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, TextField, Button } from '@mui/material';

export function Company() {
  // company: object = {companyName, location}
  const [company, setCompany] = useState('');

  function companySaveButton() {
      const queryCompanyName = document.querySelector('#company-name') as HTMLInputElement;
      const companyName = queryCompanyName.value;
      setCompany(companyName);
  }
  useEffect(() => {
      console.log('Company name ' + company)
    }, [company])

  return (
    <Fragment>
      <TextField id="company-name" label="Company Name" variant="outlined" />
      <TextField id="company-location" label="Location" variant="outlined" />
      <Button onClick={()=>companySaveButton()} variant="contained">Save</Button>
    </Fragment>
  );
}