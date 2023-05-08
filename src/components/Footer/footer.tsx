/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import ButtonGroup from '@mui/material/ButtonGroup';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import { setIsAuth, setUser } from '../../appSlice';
import { RootState } from '../../store';
import LoginPage from '../../pages/login/LoginPage';

const useStyles = makeStyles()((theme) => {
  return {
    footer: {
      padding: theme.spacing(2),
      position: 'relative',
      width: 'center',
      color: 'white',
      backgroundColor: '#E89B4B ',
      marginTop: '64px',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
      borderRadius: '16px',
    },
    link: {
      margin: theme.spacing(1.5, 1),
    },
  };
});

export default function Footer() {
  const { classes } = useStyles();
  const { isAuth } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    localStorage.removeItem('auth');
    dispatch(setUser(null));
    dispatch(setIsAuth(false));
    location.reload();
  };

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="subtitle1" align="center" component="p" gutterBottom>
        Tuffy Forum is a platform for students to post questions and respond to
        other students' questions. It is a place for students to share their
        CSUF experiences and help each other out.
      </Typography>
      <Typography variant="body2" color="white" align="center" gutterBottom>
        {'Made by '}
        <Link color="primary" href="fullerton.edu">
          Ryan Agundez
        </Link>
        {', '}
        <Link color="primary" href="fullerton.edu">
          Daniel Avila
        </Link>
        {', '}
        <Link color="primary" href="fullerton.edu">
          Jayson Doty
        </Link>
        {', '}
        <Link color="primary" href="fullerton.edu">
          John Park
        </Link>
        {' and '}
        <Link color="primary" href="fullerton.edu">
          David Santana
        </Link>
      </Typography>
      <Typography variant="body2" color="white" align="center">
        {'© '}
        {new Date().getFullYear()}
        {' Tuffy Forum'}
      </Typography>
      <BottomNavigation
        sx={{
          bgcolor: 'transparent',
          padding: '16px',
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="text primary button group"
          size="medium"
          color="primary"
          sx={{
            display: 'space-evenly',
            justifyContent: 'center',
            width: 'fit-content',
            margin: 'auto',
          }}
        >
          <Button href="/">Home</Button>
          {isAuth ? (
            <Button onClick={logoutUser} href="/">
              Logout
            </Button>
          ) : (
            <Button href="/login">Login</Button>
          )}
          <Button href="/forum">Forum</Button>
          <Button href="/postquestion">Post Question</Button>
          <Button href="/addcourse">Add Course</Button>
        </ButtonGroup>
      </BottomNavigation>
    </footer>
  );
}
