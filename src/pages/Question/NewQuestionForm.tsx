/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Snackbar,
  TextField,
  Select,
  FormControl,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import taggers from '../../components/Tags/Tags';

interface CourseValues {
  courseId: string;
  courseCode: string;
  courseName: string;
}

const initialCourseValues: CourseValues = {
  courseId: '',
  courseCode: '',
  courseName: '',
};

function NewQuestionForm() {
  const [courseInitial, setCourseInitial] =
    useState<CourseValues>(initialCourseValues);
  const [courseName, setCourseName] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseValues[] | []>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { isAuth } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/courses', {
        withCredentials: true,
      });
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onCourseChange = (event: SelectChangeEvent) => {
    setCourseName(event.target.value.toString());
    console.log(event.target.value);
  };

  const onQuestionChange = (event: SelectChangeEvent<typeof question>) => {
    setQuestion(event.target.value as string);
    console.log(event.target.value);
  };

  const onDescriptionChange = (
    event: SelectChangeEvent<typeof description>
  ) => {
    setDescription(event.target.value as string);
    console.log(event.target.value);
  };

  const handleSnackbarOpen = (message: React.SetStateAction<string>) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuth) {
      handleSnackbarOpen('Please login to ask a question');
      return;
    }

    if (!courseName) {
      handleSnackbarOpen('Please select a course');
      return;
    }

    if (!question) {
      handleSnackbarOpen('Please enter a question');
      return;
    }

    if (!description) {
      handleSnackbarOpen('Please enter a description');
      return;
    }

    if (!tags) {
      handleSnackbarOpen('Please enter tags');
      return;
    }

    await axios
      .post(
        'http://localhost:8080/api/v1/question',
        {
          courseId: courseName,
          header: question,
          text: description,
          tags,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        handleSnackbarOpen('Question asked successfully!');
        setCourseInitial(initialCourseValues);
        navigate(`/question/${response.data.questionId}`);
      })
      .catch((err) => {
        handleSnackbarOpen('Error asking question, please try again!');
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        display: 'auto',
        flexDirection: 'column',
        boxShadow: 20,
        borderRadius: '16px',
        backgroundColor: '#fff',
        padding: '16px',
        marginTop: '16px',
        marginBottom: '16px',
      }}
      margin="auto"
    >
      <header>
        <h1> Ask a Question </h1>
      </header>

      <form onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          sx={{
            marginBottom: '16px',
          }}
        >
          {courses.length === 0 ? (
            <MenuItem value="">
              <em>No courses found! Add one below!</em>
            </MenuItem>
          ) : (
            <Select
              value={courseName}
              labelId="course-select-label"
              id="course-select"
              displayEmpty
              onChange={(e) => onCourseChange(e)}
            >
              <MenuItem value="">
                <em>Select a Course!</em>
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.courseId} value={course.courseId}>
                  {course.courseCode}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>

        <Button
          type="button"
          variant="contained"
          color="primary"
          href="/addcourse"
        >
          Add a New Course
        </Button>
        <Box sx={{ width: 'auto', marginBottom: '16px', paddingTop: '16px' }}>
          <TextField
            label="Question"
            variant="outlined"
            value={question}
            onChange={(e) => onQuestionChange(e as any)}
            fullWidth
            error={question === ''}
            onError={() => {
              handleSnackbarOpen('Please enter a question header');
            }}
            color="success"
          />
        </Box>

        <Box sx={{ width: 'auto', marginBottom: '16px' }}>
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => onDescriptionChange(e as any)}
            multiline
            rows={4}
            fullWidth
            error={description === ''}
            onError={() => {
              handleSnackbarOpen('Please enter a description');
            }}
            color="success"
          />
        </Box>

        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
          <Autocomplete
            multiple
            id="tags-select"
            options={taggers}
            defaultValue={[]}
            freeSolo
            onChange={(event, value) => {
              setTags(value);
              console.log(value);
            }}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Add a tag"
              />
            )}
          />
        </FormControl>

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
