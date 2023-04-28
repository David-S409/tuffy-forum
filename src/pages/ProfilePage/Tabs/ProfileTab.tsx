import React from "react";
import { makeStyles } from 'tss-react/mui';
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  Stack,
} from '@mui/material';
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const useStyles = makeStyles()(() => {
  return {
    root: {
      paddingTop: 'auto',
      paddingBottom: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      minHeight: 'auto',
    },
  }})

export default function ProfileTab () {
  const { classes } = useStyles();
  const { user } = useSelector((state: RootState) => state.app);
  return (
    <Container maxWidth="md" className={classes.root}>
      <Stack 
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
      >
        <Typography minWidth={100}>
          First Name:
        </Typography>
        <TextField 
          disabled 
          size="small"
          label={user?.firstName}
        />
        <Typography minWidth={100}>
          Last Name:
        </Typography>
        <TextField 
          disabled 
          size="small"
          label={user?.lastName}
        />
      </Stack>
      <Stack 
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
        marginTop={5}
      >
        <Typography minWidth={100}>
          CSUF Email:
        </Typography>
        <TextField 
          disabled 
          size="small"
          fullWidth
          label={user?.email}
        />
      </Stack>
    </Container>
  )
}
