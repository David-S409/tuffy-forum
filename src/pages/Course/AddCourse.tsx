// import { TextField, Button, Paper, Box, FormHelperText } from '@mui/material';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { redirect } from 'react-router-dom';

// interface FormValues {
//   courseCode: string;
//   courseName: string;
// }

// const initialFormValues: FormValues = {
//   courseCode: '',
//   courseName: '',
// };

// function AddCourse() {
//   const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

//   const postCourse = async () => {
//     await axios
//       .post(
//         'http://localhost:8080/api/v1/course',
//         { courseCode: formValues.courseCode, name: formValues.courseName },
//         {
//           withCredentials: true,
//         }
//       )
//       .then((res) => {
//         redirect('/courses');
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     postCourse(); // Send form values to backend or do other logic here
//     setFormValues(initialFormValues); // Reset form values after submitting
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         '& > :not(style)': {
//           p: 10,
//         },
//       }}
//     >
//       <Paper>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             name="courseCode"
//             label="Course Code"
//             value={formValues.courseCode}
//             onChange={handleInputChange}
//             inputProps={{
//               pattern: '[a-zA-Z]{4} \\d{3}', // Add your regular expression pattern here
//               title:
//                 'Input must match the format of 4 letters and a space, followed by 3 digits',
//             }}
//             helperText="Format Example: CPSC 362"
//             fullWidth
//             required
//           />
//           <TextField
//             name="courseName"
//             label="Course Name"
//             value={formValues.courseName}
//             onChange={handleInputChange}
//             fullWidth
//             required
//           />

//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// export default AddCourse;

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
        redirect('/courses');
        dispatch(setCourse(res.data));
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setShowError(true);
        } else {
          console.error(err);
        }
      });
  };
  
  const setCourseId = async () => {
    await axios
      .post(
        `http://localhost:8080/api/v1/add/course/${course?.courseId}`,
        { user: user, course: course },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        redirect('/user/courses');
        setSuccess(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  useEffect(() => {
    if (success) {
      setCourseId();
    }
   }, [success]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postCourse(); // Send form values to backend or do other logic here
    setFormValues(initialFormValues); // Reset form values after submitting
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
              helperText="Format Example: CPSC 362"
              error={
                formValues.courseCode === '' ||
                !formValues.courseCode.match('[a-zA-Z]{4} [0-9]{3}') // error with being able to enter with more than 3 digits
              }
              onError={() => {
                handleSnackbarOpen('Please enter a valid course code');
              }}
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
                !formValues.courseName.match('[a-zA-Z0-9 ]+')
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
      <Snackbar
        open={showError}
        // autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <MuiAlert
          onClose={() => setShowError(false)}
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate('/courses')}
            >
              View Courses
            </Button>
          }
        >
          Course is already on the list
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default NewCourseForm;
