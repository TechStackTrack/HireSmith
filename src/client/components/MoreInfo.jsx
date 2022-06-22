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
    const moreInfo = { ...cache[0], company: [] };
    cache.map(sets => {
      moreInfo.company.push(sets.company);
    })
    
    const moreInfoTable = [];
    for (let i = 0; i < Object.keys(moreInfo).length; i++) {
      moreInfoTable.push(<tr key={i}><td>{Object.keys(moreInfo)[i]}</td><td>{moreInfo[Object.keys(moreInfo)[i]]}</td></tr>)
  }
    
    console.log('cache', cache);
    console.log('moreInfo', moreInfo);
  }, [cache])


 
  return (
    <Fragment>
      <h1>{questionid}</h1>
      {moreInfoTable.length > 0 ? moreInfoTable : null}
    </Fragment>

  )
}