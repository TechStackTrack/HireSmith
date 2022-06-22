const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');


router.get('/questions', dbController.getQuestions, (req, res) => {
  return res.status(200).json(res.locals.questions);
});

router.post('/questions', dbController.addQuestion, (req, res) => {
  return res.status(200).json(res.locals.questions);
})

// router.post('/questions', dbController.createQuestion, (req, res) => {
//   return res.status(200).json(res.locals)
// });

module.exports = router;