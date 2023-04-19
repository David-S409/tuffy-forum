// import React from "react";
// import Box from "@mui/material/Box";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import FormLabel from "@mui/material/FormLabel";
// import Button from "@mui/material/Button";
// import { makeStyles } from 'tss-react/mui';

// interface TextFieldProps {
//   size?: any
//   color?: any
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const useStyles = makeStyles()(() => {
//   return {
//     root: {
//       display: 'flex',
//       justifyContent: 'space-around',
//       alignItems: 'left',
//       flexDirection: 'column',
//       minHeight: 'auto',
//       backgroundColor: 'white',
//       marginTop: '20px',
//     },
//     content: {
//       flexGrow: 1,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   };
// });

// interface CourseListProps {
//   courses: { id: number; name: string }[];
// }

// function CourseList({ courses }: CourseListProps) {
//   const { classes } = useStyles();

//   return (
//     <Box className={classes.root}>
//       <FormControl>
//         <FormLabel>Course List</FormLabel>
//         <TextField label="Add Course Name..." variant="filled" className={classes.content}/>
//         <Button>Add Course</Button>
//       </FormControl>
//     </Box>
//   );
// };

// export default CourseList;

import React from 'react';
import { makeStyles } from 'tss-react/mui';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const useStyles = makeStyles()(() => {
  return {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '125px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: '1rem',
  },
  };
});

interface NewCourseFormProps {
  courses: string[];
  onSubmit: (courseName: string) => void;
}

const NewCourseForm: React.FC<NewCourseFormProps> = ({ courses, onSubmit }) => {
  const { classes } = useStyles();
  const [courseName, setCourseName] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(courseName);
    setCourseName('');
  };

  return (
    <div className={classes.root}>
      <h2>Add a Course</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Autocomplete
          id="course-input"
          options={courses}
          value={courseName}
<<<<<<< HEAD
          sx={{ width: 300 }}
=======
>>>>>>> refs/remotes/origin/frontend-test
          onChange={(event, newValue) => {
            setCourseName(newValue ?? '');
          }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.input}
              label="Course Name"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                autoComplete: 'new-course',
              }}
            />
          )}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Course
        </Button>
      </form>
    </div>
  );
};

export default NewCourseForm;
