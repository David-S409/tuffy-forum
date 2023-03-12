import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <h2>
          <Link to="/">Home</Link>
        </h2>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
      </ul>
    </nav>
  );
};

export default Navigation;