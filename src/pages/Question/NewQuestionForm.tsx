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
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface CourseValues {
  courseId: string;
  courseCode: string;
  courseName: string;
}

function NewQuestionForm() {
  const [courseName, setCourseName] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseValues[] | []>([]);
  const [isExpertsOnly, setIsExpertsOnly] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

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

  const handleSnackbarOpen = (message: React.SetStateAction<string>) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const onChange = (event: SelectChangeEvent) => {
    setCourseName(event.target.value as string);
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

  const onExpertsOnlyChange = (event: SelectChangeEvent) => {
    setIsExpertsOnly(event.target.checked);
    console.log(event.target.checked);
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
      const response = await axios.post(
        'http://localhost:8080/api/v1/question',
        {
          courseId: courseName,
          header: question,
          text: description,
          isExpertsOnly,
        },
        {
          withCredentials: true,
        }
      );

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
    setTags([]);
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
              onChange={(e) => onChange(e)}
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
            onChange={(e) => onExpertsOnlyChange(e)}
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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
