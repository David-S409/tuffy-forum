interface Question {
    title: string;
    body: string;
  }
  
  export const ADD_QUESTION = "ADD_QUESTION";
  
  export interface AddQuestionAction {
    type: typeof ADD_QUESTION;
    payload: Question;
  }
  
  export function addQuestion(question: Question): AddQuestionAction {
    return {
      type: ADD_QUESTION,
      payload: question,
    };
  }