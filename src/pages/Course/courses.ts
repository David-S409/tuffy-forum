export const ADD_COURSE = 'ADD_COURSE';

export function addCourse(course: { name: string; }) {
  return {
    type: ADD_COURSE,
    payload: course,
  };
}