import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoginPage from '../login/LoginPage';
import QuestionList from './QuestionList';
import NewCourseForm from '../Course/CoursesPage';

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
  const user = useSelector((state: any) => state.app.user);
  const checkUser = localStorage.getItem('auth');

  return (
    <Grid container spacing={3} direction="column">
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
          {checkUser ? ( <a></a> ) : ( <LoginPage />) }
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>
          <> {} </>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

