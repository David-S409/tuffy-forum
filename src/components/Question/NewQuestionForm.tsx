import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "./questions";
import Button from "@mui/material/Button";

export function NewQuestionForm() {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(addQuestion({ title, body }));
    setTitle("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ask a new question</h3>
      <p>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Body:
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </label>
      </p>
      <p>
        <Button type="submit">Submit</Button>
      </p>
    </form>
  );

}