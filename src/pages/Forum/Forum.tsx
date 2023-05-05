import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import QuestionList from '../Question/QuestionList';

function Forum() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center">
          Forum
        </Typography>
      </Box>
      <QuestionList />
    </Container>
  );
}

export default Forum;
