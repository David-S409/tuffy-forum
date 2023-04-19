import React, { useState } from 'react';
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
} from '@mui/material';
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
  };
});

function Forum() {
  const { classes } = useStyles();
  const { isAuth } = useSelector((state: RootState) => state.app);
  const [sortOption, setSortOption] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOption(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the search term
    console.log('Search term:', searchTerm);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Forum
      </Typography>
      {isAuth && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button variant="contained" color="primary">
            Ask a Question
          </Button>
        </Box>
      )}
      <Paper sx={{ p: 2 }}>
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
          <form onSubmit={handleSearchSubmit}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
        </Box>
        <QuestionList />
      </Paper>
    </Container>
  );
}

export default Forum;
