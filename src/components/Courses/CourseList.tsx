import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()(() => {
  return {
    root: {
      marginTop: '40px',
    },
    courseList: {
      marginTop: '16px',
    },
    listItem: {
      marginBottom: '16px',
    },
  };
});

interface Course {
  courseId: number;
  courseCode: string;
  courseName: string;
  users: string[];
  questions: number[];
}

const initialCourses: Course[] = [];

function CourseList() {
  const { classes } = useStyles();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [error, setError] = useState<null | string>(null);

  const fetchCourses = async () => {
    // try {
    //   const response = await axios.get('http://localhost:8080/api/v1/course');
    //   const coursesData = response.data.sort((a, b) =>
    //     a.courseCode.localeCompare(b.courseCode)
    //   );
    //   const coursesWithUsersAndQuestions = await Promise.all(
    //     coursesData.map(async (course) => {
    //       const usersResponse = await axios.get(
    //         `http://localhost:8080/api/v1/course/${course.courseId}/users`
    //       );
    //       const usersData = usersResponse.data;
    //       const questionsResponse = await axios.get(
    //         `http://localhost:8080/api/v1/course/${course.courseId}/questions`
    //       );
    //       const questionsData = questionsResponse.data;
    //       return { ...course, users: usersData, questions: questionsData };
    //     })
    //   );
    //   setCourses(coursesWithUsersAndQuestions);
    // } catch (err) {
    //   setError('Failed to fetch courses');
    // }

    await axios
      .get('http://localhost:8080/api/v1/course')
      .then((res) => {
        const coursesData = res.data.sort((a: Course, b: Course) =>
          a.courseCode.localeCompare(b.courseCode)
        );
        const coursesWithUsersAndQuestions = coursesData.map(
          async (course: Course) => {
            const usersResponse = await axios.get(
              `http://localhost:8080/api/v1/course/${course.courseId}/users`
            );
            const usersData = usersResponse.data;
            const questionsResponse = await axios.get(
              `http://localhost:8080/api/v1/course/${course.courseId}/questions`
            );
            const questionsData = questionsResponse.data;
            return { ...course, users: usersData, questions: questionsData };
          }
        );
        setCourses(coursesWithUsersAndQuestions);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('Failed to fetch courses');
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Course List
        </Typography>
        {error && (
          <Alert severity="error" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <ul className={classes.courseList}>
          {courses.map((course) => (
            <li key={course.courseId} className={classes.listItem}>
              <Typography variant="h6">
                {course.courseCode}: {course.courseName}
              </Typography>
              <Typography variant="body1">
                Users: {course.users.join(', ')}
              </Typography>
              <Typography variant="body1">
                Questions: {course.questions.length}
              </Typography>
              <Link to={`/course/${course.courseId}`}>View Course Details</Link>
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}

export default CourseList;
