import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';

export default function BordedSuccess() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
        navigate('/');
        }, 2000);
    }, []);

  return (
    <Grid
      container
      direction="column"
      sx={{ marginTop: '16px', backgroundColor: '#FFF', padding: '16px' }}
    >
        <Typography>Already on board</Typography>
    </Grid>
  )
}
