import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const useStyles = makeStyles()(() => {
    return {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#f5f5f5',
    overflow: 'auto',
    maxHeight: 300,
    margin: '0 auto',
  },
    };
});

interface Question {
  id: number;
  title: string;
  body: string;
  numComments: number;
  numAnswers: number;
  numUpvotes: number;
  numDownvotes: number;
}

interface Props {
  questions: Question[];
}

function QuestionList(props: Props) {
  const { questions } = props;
  const { classes } = useStyles();

  return (
    <List dense className={classes.root}>
      {questions.map((question) => (
        <ListItem key={question.id}>
          <ListItemText
            primary={
              <Typography variant="h6" component="span">
                {question.title}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body1" color="textSecondary" component="span">
                  {question.body.slice(0, 100)}
                </Typography>
                <Typography variant="caption" color="textSecondary" component="span">
                  {`${question.numComments} comments, ${question.numAnswers} answers, ${question.numUpvotes} upvotes, ${question.numDownvotes} downvotes`}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default QuestionList;
