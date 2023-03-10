<<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import  { useState, useEffect } from 'react';
=======
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state: any) => state.app.user);
  return <h1>Hello World {user.id}</h1>;
}
>>>>>>> f7c8d87513cfbcc771f5b6141b69235d9ce8d18c

const HomePage = () => {
    return (
        <div>
            
            <h1>Welcome to the CSUF TUFFY FORUM</h1>
            <p>Here, CSUF students can post questions and answers for academic purposes based on different courses.</p>
            <p>Only CSUF students can register or login to this application (based on xxxx@csu.fullerton.edu).</p>
            <p>These questions and answers are sorted based on courses.</p>
            <p>Each registered user can post a new question in any course or post an answer to an existing question.</p>
            <p>Each registered user can also add a new course to the already existing course list.</p>
            <p>Questions and answers once posted cannot be deleted or modified.</p>

            <Link to="/login">Login</Link><br></br>
            <Link to="/register">Register</Link><br></br>
            <Link to="/courses">Courses</Link><br></br>
            <Link to="/questions">Questions</Link><br></br>
            <Link to="/answers">Answers</Link><br></br>
        </div>
    );
};
