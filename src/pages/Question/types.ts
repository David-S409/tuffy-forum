// types.ts
export interface Course {
  courseId: number;
  courseCode: string;
  courseName: string;
}

export interface Question {
  courseId: any;
  postDate: any;
  questionId: string;
  header: string;
  text: string;
  votes: number;
  tags: string[];
  authorId: string;
  course: Course;
}

export interface Answer {
  answerId: string;
  text: string;
  votes: number;
  authorId: string;
  postDate: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
}

export interface Params extends Record<string, string | undefined> {
  questionId: string;
}
