import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import LoginPage from './login/LoginPage';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Footer from '../Footer/footer';

const useStyles = makeStyles()((theme) => {
  return {
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
  },
  };

});

function Home() {
  const { classes } = useStyles();
  // const user = useSelector((state: any) => state.app.user);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography variant="h4" align="center" gutterBottom>
          Tuffy Forum
        </Typography>
        {/* add your question list component here */}
        <LoginPage />
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
