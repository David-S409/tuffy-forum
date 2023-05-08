import React, { useEffect, useState } from "react";
import { makeStyles } from 'tss-react/mui';
import {
  Box,
  Button,
  Card,
  Checkbox,
} from "@mui/joy"
import { 
  CardHeader,
  Container, 
  Grid, 
  Typography 
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";


const useStyles = makeStyles()(() => {
  return {
    root: {
      
    },
    card: {
      paddingTop: 'auto',
      paddingBottom: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  }})

  interface User {
    userId: number;
  }

  interface Course {
    courseId: number;
    courseCode: string;
    name: string;
    users: User;
  }

  export default function CourseTab () {
    const { classes } = useStyles();
    const [courses, setCourses] = useState<Course[]>([]);
    const [checked, setChecked] = useState(false);
    const [ids, setIds] = useState<Array<number>>([]);
    const { course } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedId = parseInt(e.target.value);

      if(ids.includes(selectedId)) {
        const newIds = ids.filter((courseId) => courseId !== selectedId);
        setIds(newIds);
        setChecked(true);
      } else {
        const newIds = [...ids];
        newIds.push(selectedId);
        setIds(newIds);
        setChecked(false);
      }
    };

    const fetchCourses = () => {
      axios.get('http://localhost:8080/api/v1/user/courses', { withCredentials: true })
      .then((response) => {
        setCourses(response.data);
      }).catch((err) =>{
        console.error(err);
      })
    };

    useEffect(() => {
      fetchCourses();
    }, []);

  return (
    <Container maxWidth='md'>
    {courses.length == 0 ? (
      <Typography>No course found</Typography>
    ) : (

      <Grid 
        container
        className={classes.card}
        rowSpacing={3} 
        columnSpacing={{ xs: 2, sm: 3, md: 4}}
        >
        {courses.map((course) => (
            <Grid item xs>
            <Card key={courses.indexOf(course)} variant="outlined" sx={{ width: 320 }}>
              
              <CardHeader 
                title={course.courseCode}
                subheader={course.name}
              />
              <Checkbox
                value={course.courseId}
                onChange={handleCheck}
                checked={ids.includes(course.courseId) ? true : false}
                sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              />
              <Box sx={{ display: 'flex' }}>
                <Button
                  disabled={ids.includes(course.courseId) ? false : true}
                  variant="solid"
                  size="sm"
                  color="warning"
                  onClick={() => {
                    axios.get(`http://localhost:8080/api/v1/course/remove/${course.courseId}`, { withCredentials: true })
                    .then((response) => {
                      console.log("Course deleted")
                    }).catch((err) => {
                      console.error(err);
                    })
                  }}
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', fontWeight: 600 }}
                >
                  Remove
                </Button>
              </Box>
            </Card>
            </Grid>
        ))}
        </Grid>

      )}
  </Container>
  )
}
