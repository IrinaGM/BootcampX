// require node postgres
const { Pool } = require("pg");

const args = process.argv; // Retrieves arguments the user provided
const cohort = args[2] ? args[2] : null; // get the cohort name

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
    SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
    FROM teachers
    JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
    JOIN students ON assistance_requests.student_id = students.id
    JOIN cohorts ON students.cohort_id = cohorts.id
    WHERE cohorts.name = '${cohort}'
    ORDER BY teachers.name;
    `
  )
  .then((res) => {
    res.rows.forEach((data) => {
      console.log(`${data.cohort}: ${data.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
