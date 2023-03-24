import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import Box from '@mui/material/Box';
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
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: 'How do I make a new course?',
      body: "I want to make a new course, but I don't know how to do it.",
      upvotes: 0,
      downvotes: 0,
    },

    {
      id: 2,
      title: 'How do I make a new question?',
      body: "I want to make a new question, but I don't know how to do it.",
      upvotes: 0,
      downvotes: 0,
    },

    {
      id: 3,
      title: 'How do I make a new answer?',
      body: "I want to make a new answer, but I don't know how to do it.",
      upvotes: 0,
      downvotes: 0,
    },

    {
      id: 4,
      title: 'How do I make a new comment?',
      body: "I want to make a new comment, but I don't know how to do it.",
      upvotes: 0,
      downvotes: 0,
    },

    {
      id: 5,
      title: 'How do I make a new user?',
      body: "I want to make a new user, but I don't know how to do it.",
      upvotes: 0,
      downvotes: 0,
    },

    {
      id: 6,
      title: 'How do I make a new course?',
      body: "I want to make a new course, but I don't know how to do it.",
      upvotes: 0,
      downvotes: 0,
    },
  ]);

  const handleUpvote = async (question: Question) => {
    // Update the upvote count for the question
    const updatedQuestion = {
      ...question,
      upvotes: question.upvotes + 1,
    };
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
    } else {
      // Handle the error
      console.log(response.data);
    }
  };

  const handleDownvote = async (question: Question) => {
    // Update the downvote count for the question
    const updatedQuestion = {
      ...question,
      downvotes: question.downvotes + 1,
    };
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
    } else {
      // Handle the error
      console.log(response.data);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <List className={classes.root}>
        {questions.map((question) => (
          <ListItem key={question.id} button>
            <div className={classes.voteButtons}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpvote(question)}
              >
                Upvote ({question.upvotes})
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDownvote(question)}
              >
                Downvote ({question.downvotes})
              </Button>
            </div>
            <ListItemText primary={question.title} secondary={question.body} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default QuestionList;
