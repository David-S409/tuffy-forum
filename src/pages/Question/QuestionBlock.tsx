/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
// QuestionBlock.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Chip,
  Button,
  Grid,
  TextField,
  Link,
  Paper,
} from '@mui/material';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Question, Answer, Course, User } from './types';
import taggers from '../../components/Tags/Tags';
import { RootState } from '../../store';

function formatDate(date: string) {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  const hours24 = newDate.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = newDate.getMinutes();
  const amPm = hours24 >= 12 ? 'PM' : 'AM';

  const formattedDate = `${month}/${day}/${year} ${hours12}:${minutes
    .toString()
    .padStart(2, '0')} ${amPm}`;
  return formattedDate;
}

interface QuestionBlockProps {
  question: Question;
  displayAnswerCountOnly?: boolean;
}

function QuestionBlock({
  question,
  displayAnswerCountOnly = false,
}: QuestionBlockProps) {
  const [questionNew, setQuestionNew] = useState<Question>(question);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answerToPost, setAnswerToPost] = useState('');
  const [course, setCourse] = useState<Course | null>(null);
  const [showAnswerBox, setShowAnswerBox] = useState<boolean>(false);
  const [users, setUsers] = useState<User | null>(null);
  const { user } = useSelector((state: RootState) => state.app);
  const { questionId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/auth/user`, {
        withCredentials: true,
      })
      .then(async (res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchQuestion = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/questions/${question.questionId}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        await axios.get(
          `http://localhost:8080/api/v1/courses/${question.courseId}`,
          {
            withCredentials: true,
          }
        );
        setQuestionNew(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchAnswers = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/answers/${question.questionId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchCourse = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/courses/${question.courseId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.error(err));
  };

  const postAnswer = async () => {
    await axios
      .post(
        `http://localhost:8080/api/v1/answer`,
        {
          questionId: question.questionId.toString(),
          text: answerToPost,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAnswerToPost('');
        fetchAnswers();
        location.reload();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
    fetchCourse();
    fetchUser();
  }, []);

  useEffect(() => {
    if (questionNew) {
      fetchAnswers();
    }
  }, []);

  if (!questionNew) {
    return <div>Loading...</div>;
  }

  const handleQuestionClick = () => {
    navigate(`/question/${questionNew.questionId}`);
  };

  return (
    <Box paddingTop={2} color="white">
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <Button
              color="success"
              onClick={() => {
                axios
                  .post(
                    `http://localhost:8080/api/v1/upvote/question/${question.questionId}`,
                    { votes: question.votes },
                    { withCredentials: true }
                  )
                  .then((res) => {
                    location.reload();
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              <ArrowCircleUpTwoToneIcon fontSize="large" />
            </Button>
            <Typography variant="h4" align="center">
              {question.votes}
            </Typography>
            <Button
              color="error"
              onClick={() => {
                if (question.votes > 0) return;
                axios
                  .post(
                    `http://localhost:8080/api/v1/downvote/question/${question.questionId}`,
                    { votes: question.votes },
                    { withCredentials: true }
                  )
                  .then((res) => {
                    location.reload();
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              <ArrowCircleDownTwoToneIcon fontSize="large" />
            </Button>
          </Grid>
          <Grid item xs={11}>
            <Grid container justifyContent="space-between">
              <Link
                href={`/question/${questionNew.questionId}`}
                color="inherit"
                sx={{ paddingBottom: '16px' }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', margin: 'auto' }}
                >
                  {questionNew.header}
                </Typography>
              </Link>
              <Link
                href={`/forum?course=${questionNew.courseId}`}
                style={{ textDecoration: 'none' }}
                sx={{ paddingBottom: '16px' }}
              >
                <Chip
                  label={course?.courseCode || 'No course name'}
                  size="medium"
                  color="warning"
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </Grid>
            <Box sx={{ marginTop: '8px' }}>
              <Typography
                component="pre"
                sx={{ whiteSpace: 'pre-wrap', paddingBottom: '32px' }}
                align="left"
              >
                {questionNew.text}
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {questionNew.tags.length === 0 ? (
                <Typography variant="body1" sx={{ paddingBottom: '16px' }}>
                  No tags
                </Typography>
              ) : (
                <Grid item>
                  {questionNew.tags.map((tag) => {
                    return (
                      <Link
                        href={`/forum?tag=${tag}`}
                        style={{ textDecoration: 'none' }}
                        key={tag}
                        sx={{ paddingBottom: '32px' }}
                      >
                        <Chip
                          label={tag}
                          size="medium"
                          color="secondary"
                          style={{ cursor: 'pointer' }}
                        />
                      </Link>
                    );
                  })}
                </Grid>
              )}
            </Grid>
            <Typography
              variant="caption"
              sx={{
                fontSize: '14px',
                paddingLeft: '608px',
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                color: 'red',
              }}
            >
              Posted by {users?.firstName} {users?.lastName} on{' '}
              {formatDate(questionNew.postDate)}
            </Typography>
          </Grid>
        </Grid>

        {!questionId ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuestionClick}
            sx={{ marginTop: '16px' }}
          >
            Add Response
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAnswerBox(!showAnswerBox)}
            sx={{ marginTop: '16px' }}
          >
            Add an Answer
          </Button>
        )}

        <Box sx={{ marginTop: '16px' }}>
          {displayAnswerCountOnly ? (
            <Typography variant="body1">{answers.length} answer(s)</Typography>
          ) : answers.length === 0 ? (
            <Typography variant="body1">No answers</Typography>
          ) : (
            answers.map((answer) => {
              return (
                <Paper
                  elevation={3}
                  sx={{ padding: '16px', marginTop: '16px' }}
                  key={answer.answerId}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                      <Button
                        color="success"
                        onClick={() => {
                          axios
                            .post(
                              `http://localhost:8080/api/v1/upvote/answer/${answer.answerId}`,
                              { votes: answer.votes },
                              { withCredentials: true }
                            )
                            .then((res) => {
                              location.reload();
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                        }}
                      >
                        <ArrowCircleUpTwoToneIcon fontSize="large" />
                      </Button>
                      <Typography variant="h4" align="center">
                        {answer.votes}
                      </Typography>
                      <Button
                        color="error"
                        onClick={() => {
                          if (answer.votes > 0) return;
                          axios
                            .post(
                              `http://localhost:8080/api/v1/downvote/answer/${answer.answerId}`,
                              { votes: answer.votes },
                              { withCredentials: true }
                            )
                            .then((res) => {
                              location.reload();
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                        }}
                      >
                        <ArrowCircleDownTwoToneIcon fontSize="large" />
                      </Button>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography variant="body1" sx={{ padding: '32px' }}>
                        {answer.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '14px',
                          paddingLeft: '608px',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          mt: 2,
                          color: 'red',
                        }}
                      >
                        Posted by {users?.firstName} {users?.lastName} on{' '}
                        {formatDate(answer.postDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          )}
          {showAnswerBox && (
            <Box sx={{ marginTop: '16px' }}>
              <TextField
                id="outlined-multiline-static"
                label="Answer"
                multiline
                rows={4}
                fullWidth
                value={answerToPost}
                onChange={(e) => setAnswerToPost(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={postAnswer}
                sx={{ marginTop: '16px' }}
              >
                Post
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default QuestionBlock;
