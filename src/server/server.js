// import path from "path";
const path = require('path');
// import express, { Request, Response, NextFunction, RequestHandler } from 'express';
const express = require('express');
const appRouter = require('./routes/router')
const PORT = 3000;
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// })

app.use('/router', appRouter);

app.get('/', (req, res,) => {
  
})

app.post('/', (req, res) => {
  return res.status(200).json('Hello from server')
});

//unknown route
app.use('*', (req, res) => {
  res.status(404).send('Error 404, page not found.')
})

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: {
      err: 'An error occurred'
    },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;