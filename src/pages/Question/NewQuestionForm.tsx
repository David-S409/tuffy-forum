import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "./questions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Container from "@mui/material";

export function NewQuestionForm() {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(addQuestion({ title, body }));
    setTitle("");
    setQuestion("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ask a new question</h3>
            <p>
        <Box component="form" noValidate autoComplete="on">
          <TextField
            id="filled-basic"
            label="Course"
            variant="filled"
            value={title}
            onChange={e => setTitle(e.target.value)}
           />
          </Box>
      </p>
      <p>
      <Box component="form" noValidate autoComplete="on">
          <TextField
            id="filled-basic"
            label="Question to ask..."
            variant="filled"
            value={question}
            onChange={e => setQuestion(e.target.value)}
           />
          </Box>
      </p>
      <p>
        <Box component="form" noValidate autoComplete="on">
          <TextField
            id="filled-basic"
            label="Description..."
            variant="filled"
            value={body}
            onChange={e => setBody(e.target.value)}
            />
          </Box>
         </p>
      <p>
        <Button type="submit" size="large">
          Submit
          </Button>
      </p>
    </form>
  );

}