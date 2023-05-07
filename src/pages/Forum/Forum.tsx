/* eslint-disable import/no-named-as-default */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/no-array-index-key */
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { makeStyles } from 'tss-react/mui';
// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
//   Switch,
//   SelectChangeEvent,
// } from '@mui/material';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { RootState } from '../../store';
// import QuestionPage, {
//   Answer,
//   Course,
//   Question,
//   Params,
//   formatDate,
// } from '../Question/UserQuestion';

// const useStyles = makeStyles()(() => {
//   return {
//     root: {
//       paddingTop: 'auto',
//       paddingBottom: 'auto',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       minHeight: 'auto',
//       marginTop: '16px',
//       borderRadius: '16px',
//       backgroundColor: '#fff',
//       padding: '16px',
//     },
//     formControl: {
//       minWidth: 200,
//     },
//   };
// });

// function Forum() {
//   const { classes } = useStyles();
//   const { isAuth } = useSelector((state: RootState) => state.app);
//   const [questions, setQuestions] = useState<Question[]>([]);

//   const fetchQuestions = async () => {
//     await axios
//       .get('http://localhost:8080/api/v1/questions', {
//         withCredentials: true,
//       })
//       .then(async (response) => {
//         const fetchedQuestions = await Promise.all(
//           response.data.map(async (question: Question) => {
//             const courseResponse = await axios.get(
//               `http://localhost:8080/api/v1/courses/${question.courseId}`,
//               {
//                 withCredentials: true,
//               }
//             );

//             return {
//               ...question,
//               course: {
//                 courseId: courseResponse.data.courseId,
//                 courseCode: courseResponse.data.courseCode,
//               },
//             };
//           })
//         );
//         setQuestions(fetchedQuestions);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   return (
//     <Box
//       className={classes.root}
//       sx={{
//         boxShadow: 20,
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom>
//         Forum
//       </Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//         <Button variant="contained" color="primary" href="/postquestion">
//           Ask a Question
//         </Button>
//       </Box>

//       <Paper
//         sx={{ p: 2, bgcolor: 'transparent', boxShadow: 'none', mb: 3 }}
//         elevation={0}
//       >
//         {questions.map((question, index) => (
//           <Link
//             key={index}
//             to={`/question/${question.questionId}`}
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//               cursor: 'auto',
//             }}
//           >
//             <QuestionPage
//               question={{
//                 ...question,
//                 createdAt: formatDate(question.postDate),
//               }}
//             />
//           </Link>
//         ))}
//       </Paper>
//     </Box>
//   );
// }

// export default Forum;

// Forum.tsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import QuestionList from '../Question/QuestionList';
import { Question } from '../Question/types';

function Forum() {
  // Implement the forum components here
  return (
    <Container>
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="h1" align="center">
          Forum
        </Typography>
      </Box>
      <QuestionList />
    </Container>
  );
}

export default Forum;
