/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Switch,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { RootState } from '../../store';
import QuestionList from '../../components/Questions/QuestionList';

const useStyles = makeStyles()(() => {
  return {
    root: {
      paddingTop: 'auto',
      paddingBottom: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: 'auto',
      borderRadius: '16px',
      backgroundColor: '#fff',
      padding: '16px',
    },
    formControl: {
      minWidth: 200,
    },
    sortControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '16px 0',
    },
    searchForm: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    searchButton: {
      marginLeft: '8px',
      marginBottom: '8px',
      minWidth: '100px',
    },
  };
});

function Forum() {
  const { classes } = useStyles();
  const { isAuth } = useSelector((state: RootState) => state.app);
  const [sortOption, setSortOption] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [expertsOnly, setExpertsOnly] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/questions'
        );
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post('http:localhost:8080/api/v1/question', {
        searchTerm,
        expertsOnly,
        sortBy: sortOption,
      });

      // Do something with the search results
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpertsOnlyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpertsOnly(event.target.checked);
  };

  const handleCourseChange = (event: SelectChangeEvent<string>) => {
    setCourses(event.target.value);
  };

  return (
    <Box
      className={classes.root}
      sx={{
        boxShadow: 20,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Forum
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button variant="contained" color="primary" href="/postquestion">
          Ask a Question
        </Button>
      </Box>

      <Paper
        sx={{ p: 2, bgcolor: 'transparent', boxShadow: 'none', mb: 3 }}
        elevation={0}
      >
        <Box className={classes.sortControls}>
          <FormControl className={classes.formControl}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              value={sortOption}
              onChange={handleSortChange}
              autoWidth
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1, padding: 5 }}>
              Experts Only
            </Typography>
            <Switch checked={expertsOnly} onChange={handleExpertsOnlyChange} />
          </Box>
          <form onSubmit={handleSearchSubmit} className={classes.searchForm}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="course-name-label">Course Name</InputLabel>
              <Select
                labelId="course-name-label"
                id="course-name-select"
                value={courses}
                onChange={(e) => setCourses(e.target.value)}
                autoWidth
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.searchButton}
            >
              Search
            </Button>
          </form>
        </Box>
        <QuestionList />
      </Paper>
    </Box>
  );
}

export default Forum;
