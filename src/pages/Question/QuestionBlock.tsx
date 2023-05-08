/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ListItem,
  ListItemText,
  TextField,
  SelectChangeEvent,
  Alert,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  Typography,
  Input,
  Chip,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { Answer, Course, User, Question } from './types';

const useStyles = makeStyles()(() => {
  return {
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

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const amPm = hours24 >= 12 ? 'PM' : 'AM';

  const formattedDate = `${month}/${day}/${year} ${hours12}:${minutes
    .toString()
    .padStart(2, '0')} ${amPm}`;
  return formattedDate;
}

interface QuestionBlockProps {
  question: Question;
}

// interface AnswerValues {
//   text: string;
// }

// const initialAnswerValues:AnswerValues = {
//   text: '',
// }

function QuestionBlock({ question }: QuestionBlockProps) {
  const { classes } = useStyles();
  const [questionR, setQuestionR] = useState<Question>(question);
  const [course, setCourse] = useState<Course>(question.course);
  const [answer, setAnswer] = useState<Answer[]>([]);
  //const [answerText, setAnswerText] = useState<AnswerValues>(initialAnswerValues);
  const [answerError, setAnswerError] = useState(false);
  const [answerHelperText, setAnswerHelperText] = useState('');
  const [answerSuccess, setAnswerSuccess] = useState(false);
  const [showVoteBox, setShowVoteBox] = useState(false);
  const [answerSuccessMessage, setAnswerSuccessMessage] = useState('');
  const [answerFailure, setAnswerFailure] = useState(false);
  const [answerFailureMessage, setAnswerFailureMessage] = useState('');
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteSuccessMessage, setVoteSuccessMessage] = useState('');
  const [voteFailure, setVoteFailure] = useState(false);
  const [voteFailureMessage, setVoteFailureMessage] = useState('');
  const [voteError, setVoteError] = useState(false);
  const [voteHelperText, setVoteHelperText] = useState('');
  const [vote, setVote] = useState('');
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [showAnswerButton, setShowAnswerButton] = useState(true);
  const { user } = useSelector((state: RootState) => state.app);

  // Add functions to handle getting course, fetching answers, posting an answer, and voting here

  // const fetchQuestions = async () => {
  //   // Fetch questions from the backend
  //   await axios
  //     .get(`http://localhost:8080/api/v1/questions/${question.questionId}`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       // fetch course
  //       axios.get(
  //         `http://localhost:8080/api/v1/courses/${response.data.courseId}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setQuestionR(response.data);
  //       setCourse(response.data.course);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  useEffect(() => {
    const fetchAnswers = async () => {
    // Fetch answers from the backend
    await axios
      .get(`http://localhost:8080/api/v1/answers/${question.questionId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setAnswer(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    };
    fetchAnswers();
  }, []);
  

  // const postAnswer = async () => {
  //   // Post answer to the backend
  //   await axios
  //     .post(
  //       `http://localhost:8080/api/v1/answer`,
  //       {
  //         questionId: question.questionId.toString(),
  //         text: answerText.text,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setAnswerSuccess(true);
  //       setAnswerSuccessMessage('Answer posted successfully!');
  //       fetchAnswers();
  //       location.reload();
  //     })
  //     .catch((err) => {
  //       setAnswerFailure(true);
  //       setAnswerFailureMessage('Failed to post answer.');
  //       console.error(err);
  //     });
  // };

  // const upvoteAnswer = async () => {
  //   // Vote on an answer
  //   await axios
  //     .post(
  //       `http://localhost:8080/api/v1/upvote/answer/${question.questionId}`,
  //       {
  //         voteCount: question.answers.voteCount,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setVoteSuccess(true);
  //       setVoteSuccessMessage('Voted successfully!');
  //       fetchAnswers();
  //       location.reload();
  //     })
  //     .catch((err) => {
  //       setVoteFailure(true);
  //       setVoteFailureMessage('Failed to vote.');
  //       console.error(err);
  //     });
  // };

  // const downvoteAnswer = async () => {
  //   // Vote on an answer
  //   await axios
  //     .post(
  //       `http://localhost:8080/api/v1/downvote/answer/${question.questionId}`,
  //       {
  //         voteCount: question.answers.voteCount,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setVoteSuccess(true);
  //       setVoteSuccessMessage('Voted successfully!');
  //       fetchAnswers();
  //       location.reload();
  //     })
  //     .catch((err) => {
  //       setVoteFailure(true);
  //       setVoteFailureMessage('Failed to vote.');
  //       console.error(err);
  //     });
  // };

  // const upvoteQuestion = async () => {
  //   // Vote on a question
  //   await axios
  //     .post(
  //       `http://localhost:8080/api/v1/upvote/question/${question.questionId}`,
  //       {
  //         votes: question.votes
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setVoteSuccess(true);
  //       setVoteSuccessMessage('Voted successfully!');
  //       location.reload();
  //     })
  //     .catch((err) => {
  //       setVoteFailure(true);
  //       setVoteFailureMessage('Failed to vote.');
  //       console.error(err);
  //     });
  // };

  // const downvoteQuestion = async () => {
  //   // Vote on a question
  //   await axios
  //     .post(
  //       `http://localhost:8080/api/v1/downvote/question/${question.questionId}`,
  //       {
  //         votes: question.votes
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setVoteSuccess(true);
  //       setVoteSuccessMessage('Voted successfully!');
  //       location.reload();
  //     })
  //     .catch((err) => {
  //       setVoteFailure(true);
  //       setVoteFailureMessage('Failed to vote.');
  //       console.error(err);
  //     });
  // };

  // const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setAnswerText((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };

  // const handleVoteChange = (event: SelectChangeEvent) => {
  //   setVote(event.target.value);
  // };

  // const handleAnswerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (answer.text === '') {
  //     setAnswerError(true);
  //     setAnswerHelperText('Answer cannot be empty.');
  //   } else {
  //     postAnswer().then(() => {
  //     setAnswerText(initialAnswerValues);
  //     fetchAnswers();
  //   })
  //   }
  // };

  // const handleVoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (vote === '') {
  //     setVoteError(true);
  //     setVoteHelperText('Vote cannot be empty.');
  //   } else if (vote === 'upvote') {
  //     upvoteQuestion();
  //   } else {
  //     downvoteQuestion();
  //   }
  // };

  const handleAnswerButton = () => {
    setShowAnswerBox(true);
    setShowAnswerButton(false);
  };

  const handleAnswerCancel = () => {
    setShowAnswerBox(false);
    setShowAnswerButton(true);
  };

  const handleVoteCancel = () => {
    setVoteError(false);
    setVoteHelperText('');
  };

  const handleAnswerCancelError = () => {
    setAnswerError(false);
    setAnswerHelperText('');
  };

  const handleAnswerCancelSuccess = () => {
    setAnswerSuccess(false);
    setAnswerSuccessMessage('');
  };

  const handleAnswerCancelFailure = () => {
    setAnswerFailure(false);
    setAnswerFailureMessage('');
  };

  const handleVoteCancelSuccess = () => {
    setVoteSuccess(false);
    setVoteSuccessMessage('');
  };

  const handleVoteCancelFailure = () => {
    setVoteFailure(false);
    setVoteFailureMessage('');
  };

  const handleVoteCancelError = () => {
    setVoteError(false);
    setVoteHelperText('');
  };

  const handleAnswerCancelAll = () => {
    handleAnswerCancel();
    handleAnswerCancelError();
    handleAnswerCancelSuccess();
    handleAnswerCancelFailure();
  };

  const handleVoteCancelAll = () => {
    handleVoteCancel();
    handleVoteCancelError();
    handleVoteCancelSuccess();
    handleVoteCancelFailure();
  };

  const handleVoteButton = () => {
    setVoteError(false);
    setVoteHelperText('');
  };

  return (
    <ListItem key={question.questionId} sx={{width: 'auto'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '300%',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Link
                  to={`/question/${question.questionId}`}
                  style={{ textDecoration: 'none' }}
                >
                  {question.header}
                </Link>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  ml: 5,
                }}
              >
                {' '}
                 {user?.firstName} {user?.lastName} on{' '}
                {formatDate(question.postDate)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  ml: 5,
                }}
              >
                {question.tags.map((tag) => (
                  <Chip key={tag} label={tag} sx={{ marginRight: '5px' }} />
                ))}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {question.votes} votes
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {answer.length} answers
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
            </Box>
          </Box>
        </Box>
        {showAnswerBox && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* <form onSubmit={handleAnswerSubmit}>
                <FormControl
                  sx={{ width: '100%' }}
                  error={answerError}
                  variant="standard"
                >
                  <InputLabel htmlFor="answer">Answer</InputLabel>
                  <Input
                    name="text"
                    id="answerId"
                    value={answerText.text}
                    onChange={handleAnswerChange}
                    aria-describedby="answer-helper-text"
                  />
                  <FormHelperText id="answer-helper-text">
                    {answerHelperText}
                  </FormHelperText>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: '5px' }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAnswerCancel}
                    sx={{ marginRight: '5px' }}
                  >
                    Cancel
                  </Button>
                </FormControl>
              </form> */}
            </Box>
          </Box>
        )}
        {showVoteBox && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* <form onSubmit={handleVoteSubmit}>
                <FormControl
                  sx={{ width: '100%' }}
                  error={voteError}
                  variant="standard"
                >
                  <InputLabel htmlFor="vote">Vote</InputLabel>
                  <Select
                    id="vote"
                    value={vote}
                    onChange={handleVoteChange}
                    aria-describedby="vote-helper-text"
                  >
                    <MenuItem value="upvote">Upvote</MenuItem>
                    <MenuItem value="downvote">Downvote</MenuItem>
                  </Select>
                  <FormHelperText id="vote-helper-text">
                    {voteHelperText}
                  </FormHelperText>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: '5px' }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleVoteCancel}
                    sx={{ marginRight: '5px' }}
                  >
                    Cancel
                  </Button>
                </FormControl>
              </form> */}
            </Box>
          </Box>
        )}
        {answerSuccess && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Alert severity="success" onClose={handleAnswerCancelSuccess}>
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
            <Alert severity="error" onClose={handleAnswerCancelFailure}>
              {answerFailureMessage}
            </Alert>
          </Box>
        )}
        {voteSuccess && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Alert severity="success" onClose={handleVoteCancelSuccess}>
              {voteSuccessMessage}
            </Alert>
          </Box>
        )}
        {voteFailure && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Alert severity="error" onClose={handleVoteCancelFailure}>
              {voteFailureMessage}
            </Alert>
          </Box>
        )}
      </Box>
    </ListItem>
  );
}

export default QuestionBlock;