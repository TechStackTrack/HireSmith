const { Pool } = require('pg');

const PG_URI = 'postgres://ecouqssf:Db_QrtLbmSklXI6FzhLMED4XC6eqJe5U@heffalump.db.elephantsql.com/ecouqssf';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};