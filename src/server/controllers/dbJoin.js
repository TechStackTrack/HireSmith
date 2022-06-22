// THIS BELONGS IN THE dbController.js FILE
dbController.getMoreInfo = (req, res, next) => {
  const query = `SELECT q._id, title, difficulty, type, prompt, comment, c.company, r.round FROM questions q INNER JOIN join_table j ON q._id = j.question_id INNER JOIN companies c ON c._id = j.company_id INNER JOIN rounds r ON r._id = j.round_id`;
  db.query(query)
  .then((data) => {
    res.locals.moreInfo = data.rows;
    console.log('from dbController', res.locals.moreInfo)
    next();
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
}

// THIS BELONGS IN THE router.js FILE
router.get('/:questionid', dbController.getMoreInfo, (req, res) => {
  console.log('from router', res.locals.moreInfo)
  return res.status(200).json(res.locals.moreInfo);
});