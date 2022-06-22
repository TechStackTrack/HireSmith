const db = require('../models/questionModel');
const dbController = {};

dbController.getQuestions = (req, res, next) => {
  const query = `SELECT * FROM questions`;
  db.query(query)
  .then((data) => {
    res.locals.questions = data.rows;
    next();
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
}
 

dbController.addQuestion = (req, res, next) => {
  console.log('got here');
  const { title, difficulty, type, prompt, comment, company } = req.body;
  const qArr = [title, difficulty, type, prompt, comment]
  const query = `INSERT INTO questions VALUES ($1, $2, $3, $4, $5) RETURNING _id`;
  
  db.query(query, qArr)
    .then((data) => {
      console.log('returned data: ', data.json());
    })
    .catch(error => {
      console.log('db ERROR');
      return next(error);
    });
}

module.exports = dbController;