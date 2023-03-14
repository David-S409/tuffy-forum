import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SearchBar (){
  return (
    <div>
      <input type="text" placeholder="Search" />
      <button>Search</button>
    </div>
  );
};

function UserProfile () {

  const [showProfile, setShowProfile] = useState(false);

  const handleMouseEnter = () => {
    setShowProfile(true);
  };
  const handleMouseLeave = () => {
    setShowProfile(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* <FontAwesomeIcon icon={faUserAstronaut} /> */}
        <img src="https://brand.fullerton.edu/_assets/images/examples/Tuffy-Cheering.png" alt="user profile" />

        {showProfile && (
          <div className="user-profile">
            <h3>Username</h3>
            <h3>Member Since: </h3>
            <h3>Year: </h3>
            <h3>*Expert* </h3>
            <h3>*Moderator* </h3>
            <h3>Logout</h3>

          </div>
        )}

        
    </div>
  );
};

function Navigation (){
  return (
    <nav>
      <ul>
        <h2>
          <Link to="/">Home</Link>
        </h2>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
        <h2>
          <SearchBar />
        </h2>
        <h2>
          <UserProfile />
        </h2>
      </ul>
    </nav>
  );
};
