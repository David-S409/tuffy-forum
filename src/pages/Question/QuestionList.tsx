import React, { useEffect, useState } from 'react';
import { List, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
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

  const fetchQuestions = async () => {
    // Fetch questions from the backend
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const results = questions.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(results);
  }, [searchTerm, questions]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
        {filteredQuestions.map((question) => (
          <QuestionBlock key={question.id} question={question} />
        ))}
      </List>
    </Box>
  );
}

export default QuestionList;
