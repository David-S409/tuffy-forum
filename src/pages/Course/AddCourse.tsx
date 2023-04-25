import { TextField, Button, Paper, Box, FormHelperText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
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

function AddCourse() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const { user, course } = useSelector((state: RootState) => state.app);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();

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
        console.error(err);
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

  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          p: 10,
        },
      }}
    >
      <Paper>
        <form onSubmit={handleSubmit}>
          <TextField
            name="courseCode"
            label="Course Code"
            value={formValues.courseCode}
            onChange={handleInputChange}
            inputProps={{
              pattern: '[a-zA-Z]{4} \\d{3}', // Add your regular expression pattern here
              title:
                'Input must match the format of 4 letters and a space, followed by 3 digits',
            }}
            helperText="Format Example: CPSC 362"
            fullWidth
            required
          />
          <TextField
            name="courseName"
            label="Course Name"
            value={formValues.courseName}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default AddCourse;
