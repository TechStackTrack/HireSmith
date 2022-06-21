import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Company } from './Company';
import { Question } from './Question'
// import  from '@mui/material/'; // How to import?

export function Form() {
  // company: object = {companyName, location}
  const [company, setCompany] = useState();

  // question: object = {type, difficulty, round, comment, prompt}
  const [question, setQuestion] = useState();

  return (
    <Fragment>
      <Company />
      <br></br>
      <br></br>
      <Question />
    </Fragment>
  );





}