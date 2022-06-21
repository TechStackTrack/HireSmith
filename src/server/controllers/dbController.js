const db = require('../models/questionModel');
const dbController = {};

dbController.getQuestions = (req, res, next) => {
  console.log("hello");
  return next();
}

module.exports = dbController;