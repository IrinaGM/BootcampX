/* Get the names of all of the students from a single cohort. */
SELECT id, name
FROM students
WHERE cohort_id = 11
ORDER BY name;