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
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import taggers from '../../components/Tags/Tags';

function formatDate(dateString: string) {
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

interface Question {
  questionId: string;
  header: string;
  text: string;
  tags: string[];
  authorId: string;
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
        setQuestion({
          ...response.data,
          createdAt: response.data.postDate,
        });
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
    <Box paddingTop={10}>
      <Typography variant="h2">Question Posted Successfully!</Typography>
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
        <Grid container spacing={2}>
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
              <Typography variant="h4">{question.header}</Typography>
              <Link
                to={`/course/${question.course?.courseId}`}
                style={{ textDecoration: 'none' }}
              >
                <Chip label={question.course?.courseCode} />
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
            <Typography
              variant="caption"
              sx={{ fontSize: '14px', paddingLeft: '640px' }}
            >
              Posted by Author {question.authorId} on{' '}
              {formatDate(question.createdAt)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default QuestionPage;
