/* Get the average duration of assistance requests for each cohort. */

SELECT cohorts.name AS "name", AVG(assistance_requests.completed_at - assistance_requests.started_at) AS average_assistance_request_duration
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
JOIN assistance_requests ON students.id = assistance_requests.student_id
GROUP BY cohorts.name
ORDER BY average_assistance_request_duration;