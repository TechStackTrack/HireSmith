import path from "path";
import express, { Request, Response, NextFunction, RequestHandler } from 'express';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('Hiiiiii')
})

app.post('/', (req, res) => {
  return res.status(200).json('Hello from server')
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})