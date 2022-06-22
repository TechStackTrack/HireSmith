import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';

export const MoreInfo = () => {
  const { questionid } = useParams();
  const [cache, setCache] = useState([]);
  const [table, setTable] = useState(null);

  useEffect(() => {
    fetchMoreInfo();
  }, []);

  useEffect(() => {
    buildTable();
  }, [cache]);

  function fetchMoreInfo() {
    fetch(`/router/${questionid}`)
      .then((res) => res.json())
      .then((data) => setCache(data));
  }

  function buildTable() {
    //check if data has been fetched
    if (cache.length === 0) return;

    console.log('inside build table', cache);

    const result = {};

    cache.forEach((ele) => {
      if (ele.company !== null) result[ele.company] = ele.round;
    });
    // const moreInfo = { ...cache[0], company: [] };
    // cache.map((sets) => {
    //   moreInfo.company.push(sets.company);
    // });
    // const moreInfoTable = [];
    // for (let i = 0; i < Object.keys(moreInfo).length; i++) {
    //   moreInfoTable.push(
    //     <tr key={i}>
    //       <td>{Object.keys(moreInfo)[i]}</td>
    //       <td>{moreInfo[Object.keys(moreInfo)[i]]}</td>
    //     </tr>
    //   );
    // }
    // console.log('cache', cache);
    // console.log('moreInfo', moreInfo);

    console.log('RESULT is', result);

    if (Object.keys(result).length > 0) setTable(result);
  }

  return (
    <Fragment>
      <h1>{questionid}</h1>
      {/* {cache.length > 0 ? table : null} */}
      {cache.length > 0 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}></Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cache[0].title}
              </Typography>
              <Typography gutterBottom component="div">
                Difficulty: {cache[0].difficulty}
              </Typography>
              <Typography gutterBottom component="div">
                Type: {cache[0].type}
              </Typography>
              <Typography gutterBottom component="div">
                Prompt: {cache[0].prompt}
              </Typography>
              <Typography gutterBottom component="div">
                Comment: {cache[0].comment}
              </Typography>
              {table !== null &&
                Object.keys(table).map((key, i) => {
                  return (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar>
                          <PaidIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={key} secondary={table[key]} />
                    </ListItem>
                  );
                })}
              {/* <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem> */}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Fragment>
  );
};
