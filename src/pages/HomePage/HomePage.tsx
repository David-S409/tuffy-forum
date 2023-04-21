import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoginPage from '../login/LoginPage';
import QuestionList from '../../components/Questions/QuestionList';
import NewCourseForm from '../Course/NewCourseForm';
import { RootState } from '../../store';

const useStyles = makeStyles()(() => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: 'auto',
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

function Home() {
  const { classes } = useStyles();

  return (
    <Grid container spacing={3} direction="column" sx={{ marginTop: '64px' }}>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.root}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Q&A site for students and teachers
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Ask questions and get answers from other students and teachers
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>
          <QuestionList />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>
          <LoginPage />
        </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
