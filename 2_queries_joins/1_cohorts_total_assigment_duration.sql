/* Get the total amount of time that all students from a specific cohort have spent on all assignments. */

SELECT SUM(assignment_submissions.duration) as total_duration
FROM cohorts JOIN students ON cohorts.id = students.cohort_id JOIN assignment_submissions ON students.id = assignment_submissions.student_id
WHERE cohorts.name = 'FEB12';