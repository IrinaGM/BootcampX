/* Get the name of all teachers that performed an assistance request during a cohort. include the number of assistances as well. */

SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort, COUNT(assistance_requests.*) AS total_assistances
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;