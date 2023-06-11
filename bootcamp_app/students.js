// require node postgres
const { Pool } = require("pg");

const args = process.argv; // Retrieves arguments the user provided
const cohort = args[2] ? args[2] : null; // get the cohort name
const limit = args[3] ? args[3] : 5; // get the limit for the query, default 5 if not provided

// define connection to db
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

// querying the db
pool
  .query(
    `
    SELECT students.id as id, students.name as name, cohorts.name as cohort
    FROM students
    JOIN cohorts ON students.cohort_id = cohorts.id
    WHERE cohorts.name LIKE '%${cohort}%'
    LIMIT ${limit};
    `
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
