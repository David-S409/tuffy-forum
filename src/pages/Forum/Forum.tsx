/* eslint-disable import/no-named-as-default */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/no-array-index-key */

// Forum.tsx
import { Box, Typography } from '@mui/material';
import QuestionList from '../Question/QuestionList';

function Forum() {
  // Implement the forum components here
  return (
    <Box
      margin="auto"
      sx={{
        boxShadow: 20,
        borderRadius: '16px',
        backgroundColor: '#fff',
        padding: '16px',
      }}
      maxWidth="1250px"
    >
      <Box sx={{ mt: 3, mb: 2 }}>
        <h1>Forum</h1>
      </Box>
      <QuestionList />
    </Box>
  );
}

export default Forum;
