import React from "react";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import CourseList from "../components/CourseList";
import Navigation from "../components/Navigation";
import NewCourseForm from "../components/NewCourseForm";
import { useSelector } from "react-redux";

const HomePage: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.app);

  return (
    <div>
        <Navigation />
        <h1>Home Page</h1>
        <NewCourseForm />
        <CourseList courses={[{ id: 1, name: "Course 1"}]} />
    </div>
    );
};

export default HomePage;