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
      <Typography variant="subtitle1" align="center" component="p">
        Tuffy Forum is a platform for students to post questions and get help
        from other students and instructors.
      </Typography>
      <Typography variant="body2" color="white" align="center">
        {'Made by '}
        <Link color="inherit" href="https://example.com/">
          John Doe
        </Link>
        {', '}
        <Link color="inherit" href="https://example.com/">
          Jane Smith
        </Link>
        {', '}
        <Link color="inherit" href="https://example.com/">
          Joe Doe
        </Link>
        {' and '}
        <Link color="inherit" href="https://example.com/">
          Jane Dane
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
          <Button href="/">Contact Us</Button>
        </ButtonGroup>
      </BottomNavigation>
    </footer>
  );
}
