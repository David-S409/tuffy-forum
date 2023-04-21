import { TextField, Button, Paper, Box, FormHelperText } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { redirect } from 'react-router-dom';

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
