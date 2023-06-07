/* List each assignment with the total number of assistance requests with it. */

SELECT assignments.id AS id, assignments.name AS name, assignments.day AS day, assignments.chapter AS chapter, COUNT(assistance_requests.id) AS total_requests
FROM assistance_requests
JOIN assignments ON assistance_requests.assignment_id = assignments.id
GROUP BY assignments.id
ORDER BY total_requests DESC;