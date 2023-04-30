import React, { useState } from "react";
import { makeStyles } from 'tss-react/mui';
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
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
        <Typography minWidth={100} color={"InfoText"}>
          First Name:
        </Typography>
        <TextField 
          disabled 
          size="small"
          label={user?.firstName}
        />
        <Typography minWidth={100} color={"InfoText"}>
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
        <Typography minWidth={100} color={"InfoText"}>
          CSUF Email:
        </Typography>
        <TextField 
          disabled 
          size="small"
          label={user?.email}
          sx={{
            width:{sm: 200, md: 300}
          }}
        />
      </Stack>
      <Stack 
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
        marginTop={5}
      >
        <Typography minWidth={100} color={"InfoText"}>
          Year: 
        </Typography>
        <TextField 
          disabled 
          size="small"
          label={user?.year}
          sx={{
            width:{sm: 100, md: 150}
          }}
        />
        <FormControlLabel
          label="Is an Expert?"
          control={<Checkbox />}
          checked={user?.isExpert}
          disabled
        />
        <FormControlLabel
          label="Is a Mod?"
          control={<Checkbox />}
          checked={user?.isMod}
          disabled
        />
      </Stack>
    </Container>
  )
}
