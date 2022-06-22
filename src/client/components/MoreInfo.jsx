import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

export const MoreInfo = () => {
  const { questionid } = useParams();
  const [cache, setCache] = useState([]);
  
  function fetchMoreInfo() {
    fetch(`/router/${questionid}`)
      .then(res => res.json())
      .then(data => setCache(data))
  }
  useEffect(() => {
    fetchMoreInfo();
  }, [])

  useEffect(() => {
    console.log('Data from database', cache);
  }, [cache])

  return (
    <Fragment>
      <h1>{questionid}</h1>
    </Fragment>

  )
}