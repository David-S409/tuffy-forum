/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Question {
  questionId: string;
  header: string;
  text: string;
  tags: string[];
  createdAt: string;
  course: {
    courseId: string;
    courseCode: string;
  };
  user: {
    userId: string;
    username: string;
    avatarUrl: string;
  };
}

interface Params extends Record<string, string | undefined> {
  questionId: string;
}

function QuestionPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const { questionId } = useParams<Params>();

  const fetchQuestion = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/questions/${questionId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4">User's Questions</Typography>
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Button>&uarr;</Button>
            <Typography>0</Typography>
            <Button>&darr;</Button>
          </Grid>
          <Grid item xs={11}>
            <Grid container justifyContent="space-between">
              <Typography variant="h6">{question.header}</Typography>
              <Link
                to={`/course/${question.course?.courseId}`}
                style={{ textDecoration: 'none' }}
              >
                <Chip label={question.course?.courseCode} />
              </Link>
            </Grid>
            <Box>
              <Typography>{question.text}</Typography>
            </Box>
            <Grid container spacing={1}>
              {/* Add a conditional rendering for the tags section */}
              {question.tags &&
                question.tags.map((tag, index) => (
                  <Grid item key={index}>
                    <Link to={`/tag/${tag}`} style={{ textDecoration: 'none' }}>
                      <Chip label={tag} />
                    </Link>
                  </Grid>
                ))}
            </Grid>
            <Typography variant="caption">
              Posted by{' '}
              <Avatar
                alt={question.user?.username}
                src={question.user?.avatarUrl}
                sx={{ width: 24, height: 24 }}
              />{' '}
              {question.user?.username} at {question.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default QuestionPage;
