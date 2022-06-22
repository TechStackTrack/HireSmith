const db = require('../models/questionModel');
const dbController = {};

dbController.getQuestions = (req, res, next) => {
  const query = `SELECT q._id, title, difficulty, type, prompt, comment, c.company, r.round 
  FROM questions q LEFT JOIN join_table j ON q._id = j.question_id 
  LEFT JOIN companies c ON c._id = j.company_id 
  LEFT JOIN rounds r ON r._id = j.round_id`;
  
  db.query(query)
  .then((data) => {
    res.locals.questions = data.rows;
    return next();
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
}
 
dbController.findQuestion = (req, res, next) => {
  console.log('req.body in findQuestion: ', req.body);
  const { title } = req.body;
  const titleArr = [title];
  const existCheck = `SELECT * FROM questions WHERE title=$1`;
    
  // check if question already exists
  db.query(existCheck, titleArr)
  .then((data) => {
    if (data.rows.length > 0) {
      console.log('data.rows in findQuestion: ', data.rows);
      res.locals.questionInDB = true;
      res.locals.questionID = data.rows[0]._id
      console.log('data.rows._id in findQuestion: ', data.rows[0]._id);
    }
    else {
      res.locals.questionInDB = false;
    }
    return next();
  })
  .catch(error => {
    console.log('db ERROR');
    console.log('error is: ', error);
    return next(error);
  });
}

//adding a question for the first time a title appears
dbController.addQuestion = (req, res, next) => {
  if (!res.locals.questionInDB) {
    const { title, difficulty, type, prompt, comment, company } = req.body;
    const qArr = [title, difficulty, type, prompt, comment]
    const query = `INSERT INTO questions (title, difficulty, type, prompt, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  
    // insert into 'question' table if this particular question doesn't exist
    db.query(query, qArr)
      .then((data) => {
        res.locals.questionID = data.rows[0]._id;
        return next();
      })
      .catch(error => {
        console.log('addQuestion ERROR');
        console.log('error is: ', error);
        return next(error);
      });
  }
  else {
    return next();
  }
}

dbController.findCompany = (req, res, next) => {
  const { company } = req.body;
  const companyArr = [company];
  const existCheck = `SELECT * FROM companies WHERE company=$1`;
  // check if company already exists
  db.query(existCheck, companyArr)
  .then((data) => {
    if (data.rows.length > 0) {
      res.locals.companyInDB = true;
      res.locals.companyID = data.rows[0]._id
      console.log('in findCompany, data.rows._id: ', data.rows[0]._id);
    }
    else {
      res.locals.companyInDB = false;
    }
    return next();
  })
  .catch((err) => {
    console.log(err);
  });
}

//adding a company for the first time a company appears
dbController.addCompany = (req, res, next) => {
  if (!res.locals.companyInDB) {
    const { company } = req.body;
    const companyArr = [company]
    const query = `INSERT INTO companies (company) VALUES ($1) RETURNING *`;
  
    // insert into 'question' table if this particular question doesn't exist
    db.query(query, companyArr)
      .then((data) => {
        res.locals.companyID = data.rows[0]._id;
        return next();
      })
      .catch(error => {
        console.log('addCompany ERROR');
        console.log('error is: ', error);
        return next(error);
      });
  }
  else {
    return next();
  }
}

dbController.findRound = (req, res, next) => {
  const { round } = req.body;
  const roundArr = [round];
  const existCheck = `SELECT * FROM rounds WHERE round=$1`;
  // check if round already exists
  db.query(existCheck, roundArr)
  .then((data) => {
    if (data.rows.length > 0) {
      res.locals.roundInDB = true;
      res.locals.roundID = data.rows[0]._id
    }
    else {
      res.locals.roundInDB = false;
    }
    return next();
  })
  .catch((err) => {
    console.log(err);
  });
}

//adding a round the first time a specific round appears (e.g. 'phone' or 'online assessment')
dbController.addRound = (req, res, next) => {
  if (!res.locals.roundInDB) {
    const { round } = req.body;
    const roundArr = [round]
    const query = `INSERT INTO rounds (round) VALUES ($1) RETURNING *`;
  
    // insert into 'rounds' table if this particular round doesn't exist
    db.query(query, roundArr)
      .then((data) => {
        res.locals.roundID = data.rows[0]._id;
        return next();
      })
      .catch(error => {
        console.log('addRound ERROR');
        console.log('error is: ', error);
        return next(error);
      });
  }
  else {
    return next();
  }
}

dbController.addToJoin = (req, res, next) => {
  console.log('inside addToJoin');
  // WE NEED TO CHECK IF WE'RE ABOUT TO ADD AN ENTRY THAT ALREADY EXISTS IN JOIN_TABLE AND IF SO DON'T EXECUTE LOGIC BELOW
  // THE LINE BELOW DOES NOT WORK FOR THIS PURPOSE B/C ALL 3 CAN BE TRUE BUT IT STILL MIGHT NOT BE A DUPLICATE
  // if (res.locals.questionInDB && res.locals.companyInDB && res.locals.roundInDB) return next();
  
  const { questionID, companyID, roundID } = res.locals;
  const qArr = [questionID, companyID, roundID];
  console.log('qArr in addToJoin: ', qArr);
  const query = `INSERT INTO join_table (question_id, company_id, round_id) VALUES ($1, $2, $3) RETURNING *`;

  db.query(query, qArr)
    .then((data) => {
      res.locals.joinTableID = data.rows[0]._id;
      return next();
    })
    .catch(error => {
      console.log('addToJoin ERROR');
      console.log('error is: ', error);
      return next(error);
    });
}

// to get more info on a particular question
dbController.getMoreInfo = (req, res, next) => {
  const { questionid } = req.params;
  const query = `SELECT q._id, title, difficulty, type, prompt, comment, c.company, r.round FROM questions q LEFT JOIN join_table j ON q._id = j.question_id LEFT JOIN companies c ON c._id = j.company_id LEFT JOIN rounds r ON r._id = j.round_id WHERE q._id = $1`;
  db.query(query, [questionid])
    .then((data) => {
      res.locals.moreInfo = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = dbController;