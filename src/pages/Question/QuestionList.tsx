/* eslint-disable import/no-named-as-default */
// QuestionList.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, TextField } from '@mui/material';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import QuestionBlock from './QuestionBlock';
import { Question, Answer, Course } from './types';

function QuestionList() {
  // Implement the question list components here
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const fetchQuestions = async () => {
    await axios
      .get('http://localhost:8080/api/v1/questions', {
        withCredentials: true,
      })
      .then((res) => {
        setQuestions(res.data);
        setFilteredQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
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
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
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
        id="search"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <List>
        {currentQuestions.map((question) => (
          <QuestionBlock
            key={question.questionId}
            question={question}
            displayAnswerCountOnly
          />
        ))}
      </List>
      <Box display="flex" justifyContent="center">
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
    </Box>
  );
}

export default QuestionList;
