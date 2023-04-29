/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Snackbar,
  TextField,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
  const [isExpertsOnly, setIsExpertsOnly] = useState(false);
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

  const onTagChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    console.log(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const taggers = [
    'React',
    'Angular',
    'Vue',
    'Next',
    'Nest',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Java',
    'C',
    'C++',
    'C#',
    'Python',
    'PHP',
    'Ruby',
    'Swift',
  ];

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

  const onExpertsOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsExpertsOnly(event.target.checked);
    console.log(event.target.checked);
  };

  const handleSnackbarOpen = (message: React.SetStateAction<string>) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const isValidCourseCode = (courseCode: string) => {
    const courseCodePattern = /^[a-zA-Z]{4}[0-9]{4}$/;
    return courseCodePattern.test(courseCode);
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
          isExpertsOnly,
          clickedTags: tags,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        handleSnackbarOpen('Question asked successfully!');
        setCourseInitial(initialCourseValues);
        navigate('/forum');
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
        marginTop: '-160px',
        padding: '16px',
      }}
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
          <InputLabel id="course-select-label">Course</InputLabel>

          {courses.length === 0 ? (
            <MenuItem value="">
              <em>No courses found! Add one below!</em>
            </MenuItem>
          ) : (
            <Select
              label="Courses"
              value={courseName}
              labelId="course-select-label"
              id="course-select"
              onChange={(e) => onCourseChange(e)}
            >
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
          />
        </Box>

        <Box sx={{ width: 'auto', marginBottom: '16px' }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Experts Only"
            name="expertsOnly"
            onChange={(e) => onExpertsOnlyChange(e as any)}
          />
        </Box>

        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
          <InputLabel id="tags-select-label">Tags</InputLabel>
          <Autocomplete
            multiple
            id="tags-select"
            options={taggers}
            defaultValue={[]}
            freeSolo
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
          <Select
            label="Tags"
            multiple
            value={tags}
            onChange={(e) => onTagChange(e)}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'auto', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {taggers.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
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
