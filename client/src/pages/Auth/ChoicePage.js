// ChoicePage.js
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const ChoicePage = () => {
  return (
    <Layout>
    <div className="container mt-5">
      <h2>Choose Your Role</h2>
      <div className="row mt-3">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register as a Shelter</h5>
              <Link to="/sregister?role=2" className="btn btn-primary">Register</Link> {/* Set role=2 for Shelter */}
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register as an Adopter</h5>
              <Link to="/register?role=0" className="btn btn-primary">Register</Link> {/* Set role=0 for Adopter */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>

  );
};

export default ChoicePage;
