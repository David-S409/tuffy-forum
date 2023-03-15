import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "./courses";
import { makeStyles } from "tss-react/mui";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography} from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    button: {
      marginTop: theme.spacing(2),
    },
    textField: {
      marginBottom: theme.spacing(2),
    },
  };
});

export default function NewCourseForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const classes = useStyles();

  function saveCourse() {
    dispatch(addCourse({ name }));
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Add New Course
        </Typography>
        <form className={classes.form}>
          <TextField
            className={classes.textField}
            required
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            className={classes.theme.button}
            variant="contained"
            color="primary"
            onClick={saveCourse}
          >
            Save Course
          </Button>
        </form>
      </Paper>
      <div>
        <h2>Course List</h2>
        <ul>
          {/* Placeholder for list of courses */}
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
        </ul>
      </div>
    </div>
  );
}
