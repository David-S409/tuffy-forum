import React from "react";
import { Link } from "react-router-dom";

interface CourseListProps {
  courses: { id: number; name: string }[];
}

function CourseList({ courses }: CourseListProps) {
  return (
    <div className="main">
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;