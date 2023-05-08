import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import QuestionList from '../Question/QuestionList';

function Forum() {
  return (
    <div>
      <Box sx={{ mt: 1, mb: 2}}>
        <Typography variant="h4" color='CaptionText' align="center">
          Forum
        </Typography>
      </Box>
      <QuestionList />

    </div>

  );
}

export default Forum;
