import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import { Button } from '@mui/material';
import LoginPage from '../login/LoginPage';
import QuestionList from '../Question/QuestionList';
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
      direction="column"
      sx={{
        marginTop: '16px',
        marginBottom: '16px',
        backgroundColor: '#FFF',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: 20,
      }}
      margin="auto"
    >
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.root}>
          <h1>Welcome to the TUFFY FORUM</h1>
          <Typography variant="h6" component="h2" gutterBottom>
            The Forum for CSUF Students to ask and answer questions
          </Typography>
          <br />
          <br />
          <br />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>
          <QuestionList />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md" className={classes.content}>
          {isAuth ? <p /> : <LoginPage />}
        </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
