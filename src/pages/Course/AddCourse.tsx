/* eslint-disable @typescript-eslint/no-shadow */
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
import MuiAlert from '@mui/material/Alert';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCourse } from '../../appSlice';

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
  const { user, course } = useSelector((state: RootState) => state.app);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState<any[]>([]);
  const [showCourses, setShowCourses] = useState(false);

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
        dispatch(setCourse(res.data));
        setSuccess(true);
        setShowSuccess(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setShowError(true);
        } else {
          console.error(err);
          setShowError(true);
          setSuccess(false);
        }
      });
  };

  const fetchCourses = async () => {
    await axios
      .get('http://localhost:8080/api/v1/courses', {
        withCredentials: true,
      })
      .then((res) => {
        const sortedCourses = res.data.sort((a: any, b: any) => {
          // Sort by course code first
          const codeCompare = a.courseCode.localeCompare(b.courseCode);
          if (codeCompare !== 0) {
            return codeCompare;
          }

          // If course codes are equal, sort by course name
          return a.name.localeCompare(b.name);
        });
        setCourseList(sortedCourses);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postCourse().then(() => {
      setFormValues(initialFormValues); // Reset form values after submitting
      fetchCourses(); // Update the course list after submitting
      setShowCourses(true); // Show the course list after submitting
    });
  };

  const handleSnackbarOpen = (message: string) => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: 20,
        marginTop: '16px',
      }}
      margin="auto"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <h1>Add a New Course</h1>
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
              helperText="Format Example: CPSC 362"
              error={
                formValues.courseCode === '' ||
                !formValues.courseCode.match(/^[a-zA-Z]{4} [0-9]{3}$/) // error with being able to enter with more than 3 digits
              }
              sx={{}}
              color="success"
            />
            <TextField
              name="courseName"
              label="Course Name"
              variant="outlined"
              value={formValues.courseName}
              onChange={handleInputChange}
              fullWidth
              required
              helperText="Format Example: Introduction to Software Engineering"
              error={
                formValues.courseName === '' ||
                !formValues.courseName.match(/^[a-zA-Z0-9 ]+$/)
              }
              onError={() => {
                handleSnackbarOpen('Please enter a valid course name');
              }}
              color="success"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '32px',
          padding: '16px',
        }}
      >
        <Button
          onClick={() => setShowCourses(!showCourses)}
          variant="contained"
          color="secondary"
          sx={{ marginTop: '16px' }}
        >
          {showCourses ? 'Hide Courses' : 'View Courses'}
        </Button>
        {showCourses && courseList.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '32px',
              width: '100%',
              boxShadow: 20,
              borderRadius: '16px',
              backgroundColor: '#F1F1F1 ',
            }}
          >
            <h1>Course List</h1>
            <ul
              style={{
                textAlign: 'left',
                paddingBottom: '16px',
                textShadow: '0px 0px 2px #fff',
              }}
            >
              {courseList.map((course) => (
                <li key={course.courseId}>
                  {course.courseCode} - {course.name}
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <MuiAlert
          onClose={() => setShowSuccess(false)}
          severity="success"
          action={
            <Button color="inherit" size="small" onClick={fetchCourses}>
              View Courses
            </Button>
          }
        >
          Course added successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <MuiAlert
          onClose={() => setShowError(false)}
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchCourses}>
              View Courses
            </Button>
          }
        >
          {showError && !success
            ? 'Course is already on the list'
            : 'Error adding question! Make sure to follow the formatting constraints!'}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default NewCourseForm;
