/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

function NewQuestionForm() {
  const [courseName, setCourseName] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [courses, setCourses] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Check if user is authenticated
    const isAuth = true; // Replace with your authentication logic
    if (!isAuth) {
      handleSnackbarOpen('Please log in to ask a question');
      return;
    }

    if (!courseName) {
      handleSnackbarOpen('Please select a course');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/question', {
        courseId: courseName,
        header: question,
        text: description,
      });

      if (response.status === 200) {
        handleSnackbarOpen('Question created successfully');
        navigate('/forum');
      } else {
        handleSnackbarOpen('Error creating a new question');
      }
    } catch (error) {
      handleSnackbarOpen('Error creating a new question');
    }

    setCourseName('');
    setQuestion('');
    setDescription('');
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
        <h2>Ask a New Question</h2>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: '100%', marginBottom: '16px' }}>
            <TextField
              label="Course Name"
              variant="outlined"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              select
              fullWidth
            >
              {courses.length === 0 ? (
                <MenuItem value="">
                  <em>No courses found! Add one below!</em>
                </MenuItem>
              ) : (
                courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))
              )}
            </TextField>
            <p>
              Don't see your course?{' '}
              <Link to="/addcourse">Add a new one here!</Link>
            </p>
          </Box>
          <Box sx={{ width: '100%', marginBottom: '16px' }}>
            <TextField
              label="Question"
              variant="outlined"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ width: '100%', marginBottom: '16px' }}>
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
}

export default NewQuestionForm;
