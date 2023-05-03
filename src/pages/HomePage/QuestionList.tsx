/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles()(() => {
  return {
    root: {
      width: 'auto',
      backgroundColor: '#f5f5f5',
      overflow: 'auto',
      maxHeight: 'auto',
      margin: '0 auto',
    },
    voteButtons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: '16px',
      minWidth: '72px',
    },
  };
});

interface Question {
  id: number;
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
}

function QuestionList() {
  const { classes } = useStyles();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleUpvote = async (question: Question) => {
    // Update the upvote count for the question
    const updatedQuestion = {
      ...question,
      upvotes: question.upvotes + 1,
    };
    try {
      const response = await axios.put(
        `/api/questions/${question.id}`,
        updatedQuestion
      );
      if (response.status === 200) {
        // Update the questions state with the updated question
        const updatedQuestions = questions.map((q) => {
          if (q.id === question.id) {
            return updatedQuestion;
          }
          return q;
        });
        setQuestions(updatedQuestions);
      }
    } catch (error) {
      setError('Failed to upvote the question. Please try again later.');
    }
  };

  const handleDownvote = async (question: Question) => {
    // Update the downvote count for the question
    const updatedQuestion = {
      ...question,
      downvotes: question.downvotes + 1,
    };
    try {
      const response = await axios.put(
        `/api/questions/${question.id}`,
        updatedQuestion
      );
      if (response.status === 200) {
        // Update the questions state with the updated question
        const updatedQuestions = questions.map((q) => {
          if (q.id === question.id) {
            return updatedQuestion;
          }
          return q;
        });
        setQuestions(updatedQuestions);
      }
    } catch (error) {
      setError('Failed to downvote the question. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        if (response.status === 200) {
          setQuestions(response.data);
        }
      } catch (error) {
        setError('Failed to fetch questions. Please try again later.');
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {loading && <CircularProgress />}
      {!loading && questions.length === 0 && (
        <Alert severity="info">
          <AlertTitle>No questions found</AlertTitle>
          There are no questions available at the moment.
        </Alert>
      )}
      {!loading && questions.length > 0 && (
        <List className={classes.root}>
          {questions.map((question) => (
            <ListItem key={question.id} alignItems="flex-start">
              <Box className={classes.voteButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpvote(question)}
                >
                  +
                </Button>
                <Typography variant="h6" component="h3">
                  {question.upvotes - question.downvotes}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownvote(question)}
                >
                  -
                </Button>
              </Box>
              <ListItemText
                primary={question.title}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {question.body}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default QuestionList;
