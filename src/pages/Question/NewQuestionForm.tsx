/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  MenuList,
  Snackbar,
  TextField,
  ListItemText,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function NewQuestionForm() {
  const [courseName, setCourseName] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [courses, setCourses] = useState([]);
  const [isExpertsOnly, setIsExpertsOnly] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/course');
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSnackbarOpen = (message: React.SetStateAction<string>) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!courseName) {
      handleSnackbarOpen('Please select a course');
      return;
    }

    try {
      const response = await axios.post('/api/v1/question', {
        courseId: courseName,
        header: question,
        text: description,
        isExpertsOnly,
      });

      if (response.status === 200) {
        handleSnackbarOpen('Question created successfully');
        history('/forum');
      } else {
        handleSnackbarOpen('Error creating a new question');
      }
    } catch (error) {
      handleSnackbarOpen('Error creating a new question');
    }

    setCourseName('');
    setQuestion('');
    setDescription('');
    setIsExpertsOnly(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 10,
        marginTop: '-92px',
        padding: '16px',
      }}
    >
      <h2>Ask a New Question</h2>
      {error && <Alert severity="error">{error}</Alert>}
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
              <MenuList>
                {courses.map((course) => (
                  <MenuItem key={course.courseId} value={course.courseId}>
                    <ListItemText>{course.courseCode}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </TextField>
        </Box>

        <Button
          type="button"
          variant="contained"
          color="primary"
          href="/addcourse"
        >
          Add a New Course
        </Button>
        <Box sx={{ width: '100%', marginBottom: '16px', paddingTop: '16px' }}>
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
        <Box sx={{ width: '100%', marginBottom: '16px' }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Experts Only"
            name="expertsOnly"
            onChange={(e) =>
              setIsExpertsOnly((e.target as HTMLInputElement).checked)
            }
          />
        </Box>
        <Box sx={{ width: '100%', marginBottom: '16px' }}>
          <TextField
            label="Tags"
            variant="outlined"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            helperText="Enter tags separated by commas"
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </form>
    </Box>
  );
}

export default NewQuestionForm;
