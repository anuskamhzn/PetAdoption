// ChoicePage.js
import React from "react";
import { Link } from "react-router-dom";

const ChoicePage = () => {
  return (
    <div>
      <h2>Choose Your Role</h2>
      <ul>
        <li><Link to="/register?role=2">Register as a Shelter</Link></li> {/* Set role=2 for Shelter */}
        <li><Link to="/register?role=0">Register as an Adopter</Link></li> {/* Set role=0 for Adopter */}
      </ul>
    </div>
  );
};

export default ChoicePage;
