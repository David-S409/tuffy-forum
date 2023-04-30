import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoginPage from '../login/LoginPage';
import QuestionList from '../../components/Questions/QuestionList';
import NewCourseForm from '../Course/AddCourse';
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
      flexGrow: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

function Home() {
  const { classes } = useStyles();
  const { isAuth } = useSelector((state: RootState) => state.app);

  return (
    <Grid
      container
      direction="column"
      sx={{ marginTop: '16px', backgroundColor: '#FFF', padding: '16px' }}
    >
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.root}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the TUFFY FORUM
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            The Forum for CSUF Students to ask and answer questions
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h2>questions go here</h2>
          <QuestionList />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>

          {isAuth ? <p></p> : <LoginPage />}
        </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
