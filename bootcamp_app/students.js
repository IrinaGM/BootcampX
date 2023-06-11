// require node postgres
const { Pool } = require("pg");

const args = process.argv; // Retrieves arguments the user provided
const cohortName = args[2] ? args[2] : null; // get the cohort name
const limit = args[3] ? args[3] : 5; // get the limit for the query, default 5 if not provided

// set the input from the user as values for the query
const values = [`%${cohortName}%`, limit];

// define connection to db
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

// define the query
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

// querying the db
pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
