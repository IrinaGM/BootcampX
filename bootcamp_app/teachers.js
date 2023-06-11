// require node postgres
const { Pool } = require("pg");

const args = process.argv; // Retrieves arguments the user provided
const cohortName = args[2] ? args[2] : null; // get the cohort name

// set the input from the user as valuesfor the query
const values = [`${cohortName}`];

// define connection to db
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

// define the query
const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name = $1
  ORDER BY teachers.name;
  `;

// querying the db
pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((data) => {
      console.log(`${data.cohort}: ${data.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
