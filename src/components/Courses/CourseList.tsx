import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const useStyles = makeStyles()(() => {
  return {
    root: {
      marginTop: '40px',
    },
    courseList: {
      marginTop: '16px',
    },
  };
});

interface Course {
  id: number;
  name: string;
}

function CourseList() {
  const { classes } = useStyles();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data.reverse());
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

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
            <li key={course.id}>
              <Typography variant="h6">{course.name}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}

export default CourseList;
