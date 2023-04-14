/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewCourseForm() {
  const [courseName, setCourseName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = localStorage.getItem('user');

    if (!currentUser) {
      handleSnackbarOpen('Please log in to add a course');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/course', {
        name: courseName,
      });

      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/courselist'); // redirect to course list instead of post
        }, 3000);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }

    setCourseName('');
  };

  const handleSnackbarOpen = (message: string) => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '125px',
        }}
      >
        <h2>Add a New Course</h2>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: '100%', marginBottom: '16px' }}>
            <TextField
              label="Course Name"
              variant="outlined"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Course created successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showError}
          autoHideDuration={3000}
          onClose={() => setShowError(false)}
        >
          <Alert onClose={() => setShowError(false)} severity="error">
            Error creating a new course. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default NewCourseForm;
