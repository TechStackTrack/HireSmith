const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');


router.get('/questions', dbController.getQuestions, (req, res) => {
  return res.status(200).json(res.locals.questions);
});

router.post('/questions', dbController.findQuestion, dbController.addQuestion, dbController.findCompany, dbController.addCompany, dbController.findRound, dbController.addRound, dbController.addToJoin, (req, res) => {
  return res.status(200).json(res.locals);
})


router.get('/:questionid', dbController.getMoreInfo, (req, res) => {
  console.log('from router', res.locals.moreInfo)
  return res.status(200).json(res.locals.moreInfo);
});

// router.post('/questions', dbController.createQuestion, (req, res) => {
//   return res.status(200).json(res.locals)
// });

module.exports = router;