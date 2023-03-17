import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import LoginPage from '../login/LoginPage';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import QuestionList from './QuestionList';
import NewCourseForm from '../Course/CoursesPage';

const useStyles = makeStyles()((theme) => {
  return {
  root: {
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(0),
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
  //const user = useSelector((state: any) => state.app.user);
  const questions = useSelector((state: any) => /*state.app.questions*/[]);



  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography variant="h4" align="center" gutterBottom>
          WELCOME TO THE TUFFY FORUM
        </Typography>
        <QuestionList questions={questions} />
        <LoginPage />
      </Container>
    </div>
  );
}

export default Home;
