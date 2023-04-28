import React from "react";
import { makeStyles } from 'tss-react/mui';
import {
  Box,
  Button,
  Typography,
  Container,
} from '@mui/material';

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
  }})

export default function QuestionTab () {
  const { classes } = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      
    </Container>
  )
}
