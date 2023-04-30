/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { RootState } from '../../store';
import Tag from '../Tags/Tag';

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      width: 'auto',
      backgroundColor: theme.palette.background.paper,
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

interface Response {
  id: number;
  body: string;
  user: {
    username: string;
  };
  createdAt: string;
}

interface Question {
  id: number;
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
  tags: string[];
  expertsOnly: boolean;
  searchTerm: string;
  responses: Response[];
}

function QuestionList() {
  const { classes } = useStyles();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { isAuth } = useSelector((state: RootState) => state.app);
  const [expertsOnly] = useState(false);
  const [newResponse, setNewResponse] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        'http://localhost:8080/api/v1/questions',
        {
          params: {
            expertsOnly: expertsOnly ? 'true' : undefined,
          },
        }
      );
      if (response.status === 200) {
        setQuestions(response.data);
      } else {
        // Handle the error
        setAlertMessage(response.data);
        setShowAlert(true);
      }
    };

    fetchQuestions();
  }, [expertsOnly]);

  const handleUpvote = async (question: Question) => {
    if (!isAuth) {
      setAlertMessage('You must be logged in to vote.');
      setShowAlert(true);
      return;
    }
    // Update the upvote count for the question
    const updatedQuestion = {
      ...question,
      upvotes: question.upvotes + 1,
    };
    const response = await axios.put(
      `http://localhost:8080/api/v1/questions/${question.id}/upvote`
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
      setAlertMessage(response.data);
      setShowAlert(true);
    }
  };

  const handleDownvote = async (question: Question) => {
    if (!isAuth) {
      setAlertMessage('You must be logged in to vote.');
      setShowAlert(true);
      return;
    }
    // Update the downvote count for the question
    const updatedQuestion = {
      ...question,
      downvotes: question.downvotes + 1,
    };
    const response = await axios.put(
      `http://localhost:8080/api/v1/questions/${question.id}/downvote`
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
      setAlertMessage(response.data);
      setShowAlert(true);
    }
  };

  const handleTagClick = (tag: string) => {
    // Update the questions state to only show questions with the tag
    console.log('Navigating to tag: ${tag}');
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const handleAddRespone = async (
    event: React.FormEvent<HTMLFormElement>,
    questionId: number,
    Response: string
  ) => {
    event.preventDefault();
    if (!isAuth) {
      setAlertMessage('You must be logged in to add a response.');
      setShowAlert(true);
      return;
    }

    await axios
      .post(`http://localhost:8080/api/v1/questions/${questionId}/responses`, {
        body: Response,
      })
      .then((response) => {
        if (response.status === 201) {
          const updatedQuestions = questions.map((q) => {
            if (q.id === questionId) {
              return {
                ...q,
                responses: [...q.responses, response.data],
              };
            }
            return q;
          });
          setQuestions(updatedQuestions);
          setNewResponse('');
        } else {
          // Handle the error
          setAlertMessage(response.data);
          setShowAlert(true);
        }
      })
      .catch((error) => {
        // Handle the error
        setAlertMessage(error.response.data);
        setShowAlert(true);
        console.log(error);
      });
  };

  return (
    <Box>
      <List className={classes.root}>
        {questions.map((question) => (
          <ListItem key={question.id} divider>
            <Box className={classes.voteButtons}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpvote(question)}
              >
                Upvote ({question.upvotes})
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleDownvote(question)}
              >
                Downvote ({question.downvotes})
              </Button>
            </Box>
            <ListItemText primary={question.title} secondary={question.body} />
            <Box>
              {question.tags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  handleClick={async () => handleTagClick(tag)}
                />
              ))}
            </Box>
            {question.responses.map((response) => (
              <ListItemText
                key={response.id}
                primary={response.body}
                secondary={`By: ${response.user.username} on ${response.createdAt}`}
              />
            ))}
            <form
              onSubmit={(event) =>
                handleAddRespone(event, question.id, newResponse)
              }
            >
              <TextField
                label="Add a response"
                value={newResponse}
                onChange={(event) => setNewResponse(event.target.value)}
                sx={{ width: '100%', marginBottom: '1rem' }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '100%' }}
              >
                Add Response
              </Button>
            </form>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default QuestionList;
