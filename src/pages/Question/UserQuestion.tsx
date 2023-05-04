/* eslint-disable @typescript-eslint/no-shadow */
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
  TextField,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import taggers from '../../components/Tags/Tags';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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

export interface Course {
  courseId: number;
  courseCode: string;
  courseName: string;
}
export interface Question {
  courseId: any;
  postDate(postDate: any): string;
  questionId: string;
  header: string;
  text: string;
  votes: number;
  tags: string[];
  authorId: string;
  createdAt: string;
  course: Course;
  user: {
    userId: string;
    username: string;
    avatarUrl: string;
  };
}

export interface Answer {
  answerId: string;
  text: string;
  authorId: string;
  createdAt: string;
  user: {
    userId: string;
    username: string;
    avatarUrl: string;
  };
}

export interface Params extends Record<string, string | undefined> {
  questionId: string;
}

function QuestionPage({
  question: initialQuestion,
}: {
  question: Question | null;
}) {
  const [question, setQuestion] = useState<Question | null>(initialQuestion);
  const { questionId } = useParams<Params>();
  const [tags, setTags] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [answerText, setAnswerText] = useState<string>('');
  const [showAnswerBox, setShowAnswerBox] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.app);

  const fetchQuestion = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/questions/${questionId}`, {
        withCredentials: true,
      })
      .then(async (response) => {
        // Fetch course data using courseId
        const { courseId } = response.data;
        const courseResponse = await axios.get(
          `http://localhost:8080/api/v1/courses/${courseId}`,
          {
            withCredentials: true,
          }
        );

        setQuestion({
          ...response.data,
          createdAt: formatDate(response.data.postDate),
          course: {
            courseId: courseResponse.data.courseId,
            courseCode: courseResponse.data.courseCode,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const fetchAnswers = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/questions/${questionId}/answers`, {
        withCredentials: true,
      })
      .then((response) => {
        setAnswers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    if (question) {
      fetchAnswers();
    }
  }, [question]);

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleQuestionClick = () => {
    setShowAnswerBox((prevValue) => !prevValue);
  };

  const submitAnswer = async () => {
    await axios
      .post(
        `http://localhost:8080/api/v1/questions/${questionId}/answers`,
        { text: answerText },
        { withCredentials: true }
      )
      .then((response) => {
        // Add the new answer to the answers array
        setAnswers([...(answers || []), response.data]);
        // Clear the new answer text
        setAnswerText('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box paddingTop={0} color="white">
      <Typography variant="h2">Question</Typography>
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <Button color="success" 
              onClick={() => {
                axios.post(`http://localhost:8080/api/v1/upvote/question/${question.questionId}`,
                  { votes: question.votes }, { withCredentials: true }
                ) .then((res) => {
                  location.reload();
                }).catch((err) => {
                  console.error(err);
                })
              }}
              >
              <ArrowCircleUpTwoToneIcon fontSize="large" />
            </Button>
            <Typography variant="h4" align="center">
              {question.votes}
            </Typography>
            <Button color="error"
              onClick={() => {
                axios.post(`http://localhost:8080/api/v1/downvote/question/${question.questionId}`,
                  { votes: question.votes }, { withCredentials: true }
                ) .then((res) => {
                  location.reload();
                }).catch((err) => {
                  console.error(err);
                })
              }}
              >
              <ArrowCircleDownTwoToneIcon fontSize="large" />
            </Button>
          </Grid>
          <Grid item xs={11}>
            <Grid container justifyContent="space-between">
              <Typography variant="h4">{question.header}</Typography>
              <Link
                to={`/course/${question.course?.courseId}`}
                style={{ textDecoration: 'none' }}
              >
                <Chip
                  label={question.course?.courseCode || 'No Course'}
                  size="medium"
                  color="warning"
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </Grid>
            <Box sx={{ paddingTop: '16px', paddingBottom: '32px' }}>
              <Typography
                component="pre"
                sx={{ whiteSpace: 'pre-wrap' }}
                align="left"
              >
                {question.text}
              </Typography>
            </Box>
            {/* use taggers import to get the tags  */}
            <Grid container spacing={1}>
              {question.tags.length === 0 ? (
                <Typography>No tags</Typography>
              ) : (
                <Grid item>
                {question.tags.map((tag) => {
                  return (
                  <Link to={`/tag/${tag}`} style={{ textDecoration: 'none' }}>
                    <Chip
                      label={tag}
                      size="medium"
                      color="secondary"
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                  )
                })}
                </Grid>
              
              ) }
              </Grid>
            <Typography
              variant="caption"
              sx={{ fontSize: '14px', paddingLeft: '608px', display: 'flex', justifyContent: 'flex-end', mt: 2}}
            >
              Posted by {user?.firstName} {user?.lastName} on{' '}
              {formatDate(question.createdAt)}
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleQuestionClick}
          sx={{ marginTop: '16px', marginBottom: '16px' }}
        >
          Add Response
        </Button>

        {answers &&
          answers.map((answer, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{ padding: '16px', marginTop: '16px', marginBottom: '16px' }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={1}>
                  <Button color="success">
                    <ArrowCircleUpTwoToneIcon fontSize="large" />
                  </Button>
                  <Typography variant="h4" align="center">
                    0
                  </Typography>
                  <Button color="error">
                    <ArrowCircleDownTwoToneIcon fontSize="large" />
                  </Button>
                </Grid>
                <Grid item xs={11}>
                  <Grid container justifyContent="space-between">
                    <Typography variant="h4">Answer</Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <Typography variant="h4">Submit Your Answer</Typography>
                        <Box sx={{ marginTop: '16px', marginBottom: '16px' }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={answerText}
                            onChange={(event) =>
                              setAnswerText(event.target.value)
                            }
                            label="Your answer"
                            variant="outlined"
                          />
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={fetchAnswers}
                        >
                          Submit Answer
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box sx={{ paddingTop: '16px', paddingBottom: '32px' }}>
                    <Typography
                      component="pre"
                      sx={{ whiteSpace: 'pre-wrap' }}
                      align="left"
                    >
                      {answer.text}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: '14px', paddingLeft: '640px' }}
                  >
                    Posted by Author {answer.authorId} on{' '}
                    {formatDate(answer.createdAt)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        {showAnswerBox && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4">Submit Your Answer</Typography>
              <Box sx={{ marginTop: '16px', marginBottom: '16px' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={answerText}
                  onChange={(event) => setAnswerText(event.target.value)}
                  label="Your answer"
                  variant="outlined"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={submitAnswer}
              >
                Submit Answer
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default QuestionPage;
