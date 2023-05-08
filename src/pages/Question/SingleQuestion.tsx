/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-named-as-default */
// SingleQuestion.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import QuestionBlock from './QuestionBlock';
import { Question } from './types';

interface RouteParams {
  id: string;
}

function SingleQuestion() {
  // Implement the single question components here
  const { questionId } = useParams<string>();
  const [question, setQuestion] = useState<Question | null>(null);
  const { user } = useSelector((state: any) => state.app);

  useEffect(() => {
    const fetchQuestion = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/questions/${questionId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setQuestion(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchQuestion();
  }, []);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Box margin="auto" maxWidth="1250px">
      <Typography variant="h4" component="h1" gutterBottom>
        {user?.firstName} Is Asking:
        <div>
          <QuestionBlock question={question} />
        </div>
      </Typography>
    </Box>
  );
}

export default SingleQuestion;
