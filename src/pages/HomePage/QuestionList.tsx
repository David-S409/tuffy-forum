import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const useStyles = makeStyles()(() => {
    return {
  root: {
    width: 'auto',
    backgroundColor: '#f5f5f5',
    overflow: 'auto',
    maxHeight: 'auto',
    margin: '0 auto',
  },
    };
});


function QuestionList() {
    const { classes } = useStyles();
    const questions = [
        {
            id: 1,
            title: 'How do I make a new course?',
            body: 'I want to make a new course, but I don\'t know how to do it.',

        },

        {
            id: 2,
            title: 'How do I make a new question?',
            body: 'I want to make a new question, but I don\'t know how to do it.',
        },

        {
            id: 3,
            title: 'How do I make a new answer?',
            body: 'I want to make a new answer, but I don\'t know how to do it.',
        },

        {
            id: 4,
            title: 'How do I make a new comment?',
            body: 'I want to make a new comment, but I don\'t know how to do it.',
        },

        {
            id: 5,
            title: 'How do I make a new user?',
            body: 'I want to make a new user, but I don\'t know how to do it.', 
        },

        {
            id: 6,
            title: 'How do I make a new course?',
            body: 'I want to make a new course, but I don\'t know how to do it.',
        },
    ];

    return (

    <Box sx={{bgcolor: 'background.paper' }}>
      <List className={classes.root}>
          {questions.map((question) => (
              <ListItem key={question.id} button>
                  <ListItemText primary={question.title} secondary={question.body} />
              </ListItem>
          ))}
      </List>
  </Box>
        
    );
}

export default QuestionList;
