import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import ButtonGroup from '@mui/material/ButtonGroup';

const useStyles = makeStyles()((theme) => {
    return {
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    position: 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  link: {
    margin: theme.spacing(1.5, 1),
  },
};
});

export default function Footer() {
  const {classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Tuffy Forum is a platform for students to post questions and get help from other students and instructors.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
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
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        {new Date().getFullYear()}
        {' Tuffy Forum'}
      </Typography>
      <BottomNavigation sx={{paddingTop: 2}}>
        <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
            <Button href='/'>
                Home
             </Button>
            <Button href='/login'>
                Login
             </Button>
            <Button href='/'>
                Contact Us
             </Button>
        </ButtonGroup>
      </BottomNavigation>
    </footer>
  );
}
