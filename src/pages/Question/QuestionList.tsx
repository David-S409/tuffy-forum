import React, { useEffect, useState } from 'react';
import { List, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import QuestionBlock from './QuestionBlock';
import { Answer, Course, User, Question } from './types';
import { ListDivider } from '@mui/joy';

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const fetchQuestions = async () => {
    // Fetch questions from the backend
    await axios
      .get(`http://localhost:8080/api/v1/questions`, {
        withCredentials: true,
      })
      .then((response) => {
        setQuestions(response.data);
        setFilteredQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const results = questions.filter((question) =>
      searchTerm === ''
        ? true
        : question.header.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredQuestions(results);
  }, [searchTerm, questions]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          mt: 3,
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
                variant="h5"
                color='CaptionText'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
              >
                Title
              </Typography>

              <Typography
                variant="h5"
                color='CaptionText'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '100%',
                  ml: 5,
                }}
              >
                User
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography
                variant="h5"
                color='CaptionText'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '100%',
                  ml: 5,
                }}
              >
                Tags
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
          </Box>
        </Box>
        </Box>
        <ListDivider/>
      <List>
        {currentQuestions.map((question) => (
          <><QuestionBlock key={question.questionId} question={question} /><ListDivider /></>
        ))}
      </List>

      <Pagination
        count={Math.ceil(filteredQuestions.length / questionsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </Box>
  );
}

export default QuestionList;
