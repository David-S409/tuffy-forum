export interface Question {
  questionId: number;
  authorId: number;
  courseId: number;
  header: string;
  text: string;
  upvotes: number;
  downvotes: number;
  postDate: string;
  tags: string[];
  answers: Answer[];
  course: Course;
  user: User;
}

export interface Answer {
  answerId: number;
  questionId: number;
  userId: number;
  text: string;
  upvotes: number;
  downvotes: number;
  postDate: string;
  user: User;
}

export interface Course {
  courseId: number;
  courseName: string;
}

export interface User {
  userId: number;
  userName: string;
}
