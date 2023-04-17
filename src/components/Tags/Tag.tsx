/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Chip from '@mui/material/Chip';

interface Props {
  label: string;
  onClick?: () => void;
  handleClick: (tag: string) => Promise<void>;
}

const useStyles = makeStyles()((theme) => {
  return {
    tag: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
    },
  };
});

function Tag({ label, onClick }: Props) {
  const { classes } = useStyles();
  return (
    <Chip
      className={classes.tag}
      label={label}
      onClick={onClick}
      variant="outlined"
    />
  );
}

export default Tag;
