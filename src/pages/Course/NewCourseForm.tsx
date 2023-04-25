/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { RootState } from '../../store';

interface FormValues {
  courseCode: string;
  courseName: string;
}

const initialFormValues: FormValues = {
  courseCode: '',
  courseName: '',
};

function NewCourseForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.app);

  const postCourse = async () => {
    await axios
      .post(
        'http://localhost:8080/api/v1/course',
        { courseCode: formValues.courseCode, name: formValues.courseName },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate('/courses');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // postCourse(); // Send form values to backend or do other logic here
    if (!isAuth) {
      handleSnackbarOpen('Please log in to add a course');
      return;
    }

    try {
      postCourse();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormValues(initialFormValues);
      }, 3000);
    } catch (error) {
      setShowError(true);
    }

    // setFormValues(initialFormValues); // Reset form values after submitting
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
          boxShadow: 10,
          marginTop: '32px',
          padding: '16px',
        }}
      >
        <h2>Add a New Course</h2>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: '100%', marginBottom: '16px' }}>
            <TextField
              name="courseCode"
              label="Course"
              variant="outlined"
              value={formValues.courseCode}
              onChange={handleInputChange}
              fullWidth
              required
              error={
                formValues.courseCode === '' ||
                !formValues.courseCode.match('[a-zA-Z]{4} [0-9]{3}')
              }
              onError={() => {
                handleSnackbarOpen('Please enter a valid course code');
                if (showSuccess) setShowSuccess(false);
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={(sx) => {
              showSuccess;
            }}
          >
            Submit
          </Button>
        </form>
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
        >
          <MuiAlert onClose={() => setShowSuccess(false)} severity="success">
            Course created successfully!
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={showError}
          autoHideDuration={3000}
          onClose={() => setShowError(false)}
        >
          <MuiAlert onClose={() => setShowError(false)} severity="error">
            Error creating a new course. Please try again.
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default NewCourseForm;
