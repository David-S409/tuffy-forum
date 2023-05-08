import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Question, Answer } from './types';
import QuestionBlock, { formatDate } from './QuestionBlock';
import { Alert, Box, Button, Chip, Container, Divider, FormControl, FormHelperText, Grid, IconButton, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FormatAlignJustify } from '@mui/icons-material';

interface RouteParams {
  id: string;
}

interface AnswerValues {
  text: string;
}

const initialAnswerValues:AnswerValues = {
  text: '',
}

function SingleQuestion() {
  const { questionId } = useParams<string>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswer] = useState<Answer[]>([]);
  const [answerId, setAnswerId] = useState("");
  const { user } = useSelector((state: RootState) => state.app);
  const [answerText, setAnswerText] = useState<AnswerValues>(initialAnswerValues);
  const [answerError, setAnswerError] = useState(false);
  const [answerHelperText, setAnswerHelperText] = useState('');
  const [answerSuccess, setAnswerSuccess] = useState(false);
  const [answerSuccessMessage, setAnswerSuccessMessage] = useState('');
  const [answerFailure, setAnswerFailure] = useState(false);
  const [answerFailureMessage, setAnswerFailureMessage] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/questions/${questionId}`,
          { withCredentials: true }
        );
        setQuestion(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/answers/${questionId}`,
          { withCredentials: true }
        );
        setAnswer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion();
    fetchAnswers();
  }, []);

  if (!question) {
    return <div>Loading...</div>;
  }

  const upvoteQuestion = async () => {
    // Vote on a question
    await axios
      .post(
        `http://localhost:8080/api/v1/upvote/question/${question.questionId}`,
        {
          votes: question.votes
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const downvoteQuestion = async () => {
    // Vote on a question
    await axios
      .post(
        `http://localhost:8080/api/v1/downvote/question/${question.questionId}`,
        {
          votes: question.votes
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const postAnswer = async () => {
    // Post answer to the backend
    await axios
      .post(
        `http://localhost:8080/api/v1/answer`,
        {
          questionId: question.questionId.toString(),
          text: answerText.text,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAnswerSuccess(true);
        setAnswerSuccessMessage('Answer posted successfully!');
        location.reload();
      })
      .catch((err) => {
        setAnswerFailure(true);
        setAnswerFailureMessage('Failed to post answer.');
        console.error(err);
      });
  };

  const upvoteAnswer = async () => {
    // Vote on an answer
    await axios
      .post(
        `http://localhost:8080/api/v1/upvote/answer/${answerId}`,
        {
          votes: question.answers.votes,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const downvoteAnswer = async () => {
    // Vote on an answer
    await axios
      .post(
        `http://localhost:8080/api/v1/downvote/answer/${answerId}`,
        {
          votes: question.answers.votes,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleVoteUpButton = (e: any) => {
    setAnswerId(e);
    upvoteAnswer();
  }

  const handleVoteDownButton = (e: any) => {
    setAnswerId(e);
    downvoteAnswer();
  }

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAnswerText((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAnswerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (answerText.text === '') {
      setAnswerError(true);
      setAnswerHelperText('Answer cannot be empty.');
    } else {
      postAnswer().then(() => {
      setAnswerText(initialAnswerValues);
    })
    }
  };

  const handleAnswerCancelError = () => {
    setAnswerError(false);
    setAnswerHelperText('');
  };
  console.log(answerId);

  return (
    <>
    <Container>
      <Grid>
        <Typography 
          variant='h4'
          color='CaptionText'
          display='flex'
          sx={{mb: 3}}
          >
          {question.header}
        </Typography>
        <Grid
          display="flex"
        >
          {question.tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ marginRight: '5px' }} />
          ))}
        </Grid>
        <Divider sx={{mt: 2}}/>
      </Grid>
      <Grid sx={{mt: 3}} display="flex" flexDirection='row'>
        <Grid 
          display='table-header-group'
          sx={{mr: 4, ml: 4}}
          >
          <IconButton
            onClick={upvoteQuestion}
          >
            <ArrowDropUpIcon fontSize='large' />
          </IconButton>
          <Typography>
            {question.votes}
          </Typography>
          <IconButton
            onClick={downvoteQuestion}
          >
            <ArrowDropDownIcon fontSize='large' />
          </IconButton>
        </Grid>
        <Grid 
      display='flex'
      flexDirection='column'
      sx={{mt: 1}}
      width='100%'
      >
        <Typography 
          variant='h5'
          color='CaptionText'
          display="flex"
          >
          {question.text}
        </Typography>
        <Grid>
          <Grid
          display='flex'
          flexDirection='row'
          justifyContent='flex-end'
          >
          <Typography
            display='flex'
            justifyContent='flex-end'
            fontSize={15}
          >
            Posted by: {user?.firstName} {user?.lastName} on {formatDate(question.postDate)}
          </Typography>
          </Grid>
          
        </Grid>
      </Grid>
      </Grid>
    <Container>
      <Typography
        variant='h6'
        display='flex'
        justifyContent='flex-start'
        color='ButtonText'
        sx={{mt: 4}}
      >
        {answers.length} Answers
      </Typography>
        {answers.map((answer) => (
        <Grid sx={{mt: 3}} display="flex" flexDirection='row'>
          <Grid 
            display='table-header-group'
            sx={{mr: 4, ml: 4}}
            >
            <IconButton
              onClick={() => handleVoteUpButton(answer.answerId)}
            >
              <ArrowDropUpIcon fontSize='large' />
            </IconButton>
            <Typography>
              {answer.votes}
            </Typography>
            <IconButton
              onClick={() => handleVoteDownButton(answer.answerId)}
            >
              <ArrowDropDownIcon fontSize='large' />
            </IconButton>
          <Divider />
          </Grid>
          <Grid 
      display='flex'
      flexDirection='column'
      sx={{mt: 1}}
      width='100%'
      >
        <Typography 
          variant='h6'
          color='CaptionText'
          fontFamily='monospace'
          display="flex"
          >
          {answer.text}
        </Typography>
        <Grid>
          <Grid
          display='flex'
          flexDirection='row'
          justifyContent='flex-end'
          >
          <Typography
            display='flex'
            justifyContent='flex-end'
            fontSize={15}
          >
            Answered by: {user?.firstName} {user?.lastName} on {formatDate(answer.postDate)}
          </Typography>
          </Grid>
          
        </Grid>
      </Grid>
        </Grid>
        ))}
    </Container>
    <form onSubmit={handleAnswerSubmit}>
    <FormControl
      sx={{ width: '100%' }}
      error={answerError}
      variant="standard"
    >
    <TextField
          id="outlined-multiline-static"
          label="Your answer"
          name="text"
          multiline
          rows={8}
          fullWidth
          value={answerText.text}
          onChange={handleAnswerChange}
          sx={{mt: 10}}
        />
        <FormHelperText id="answer-helper-text">
          {answerHelperText}
        </FormHelperText>
        <Button
          variant='outlined'
          type='submit'
          sx={{
            mt: 1,
            display:'flex',
          }}
        >
          Post Answer
        </Button>
        </FormControl>
        </form>
    </Container>
    {answerSuccess && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Alert severity="success">
              {answerSuccessMessage}
            </Alert>
          </Box>
        )}
      {answerFailure && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Alert severity="error">
            {answerFailureMessage}
          </Alert>
        </Box>
      )}
    </>
  )
 }

export default SingleQuestion;