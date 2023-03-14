import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const useStyles = makeStyles()((theme) => {
    return {
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  link: {
    margin: theme.spacing(1, 1.5),
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
      <footer>
        <Link component="button" variant="body2" onClick={() => {}}>
            Home
        </Link>
        <Link component="button" variant="body2" onClick={() => {}}>
            Login
        </Link>
        <Link component="button" variant="body2" onClick={() => {}}>
            Contact Us
        </Link>
      </footer>
    </footer>
  );
}
