import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Question } from './types';
import QuestionBlock from './QuestionBlock';

interface RouteParams {
  id: string;
}

function SingleQuestion() {
  const { id } = useParams<string>();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/question/${id}`,
          { withCredentials: true }
        );
        setQuestion(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return <QuestionBlock question={question} />;
}

export default SingleQuestion;
