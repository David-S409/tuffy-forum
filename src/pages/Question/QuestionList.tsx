import React, { useEffect, useState } from 'react';
import { List, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import QuestionBlock from './QuestionBlock';

interface Question {
  id: number;
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
  tags: string[];
  searchTerm: string;
  responses: Response[];
}

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 7;

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
    const results = questions.filter(
      (question) => question.title === searchTerm
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
      <List>
        {currentQuestions.map((question) => (
          <QuestionBlock key={question.id} question={question} />
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
