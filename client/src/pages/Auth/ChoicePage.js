// ChoicePage.js
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import user from "../../imag/user.jpg";
import shelter from "../../imag/shelter.jpg";

const ChoicePage = () => {
  return (
    <Layout>
      <div className="container mt-5 pt-5 pb-4">
        <h2>Choose Your Role</h2>
        <div className="row mt-3">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="row">
                <div className="col-5 col-sms-9">
                  <img src={user} className="img-fluid"></img>
                </div>
                <div className="col-6 col-sms-9 row align-items-center justify-content-center">
                  <div className="card-body">
                    <h5 className="card-title">Register as a Shelter</h5>
                    <p>
                      Make a difference in the lives of animals in need.
                      Register your shelter today and connect with potential
                      adopters to give pets a loving forever home.
                    </p>
                    <Link
                      to="/sregister?role=2"
                      className="px-3 py-1 mt-2 btn-more"
                    >
                      Register
                    </Link>{" "}
                    {/* Set role=2 for Shelter */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="row">
                <div className="col-5 col-sms-9">
                  <img src={shelter} className="img-fluid"></img>
                </div>
                <div className="col-6 col-sms-9 row align-items-center justify-content- ">
                  <div className="card-body">
                    <h5 className="card-title">Register as an Adopter</h5>
                    <p>
                      Join our community and unlock a world of furry friends.
                      Sign up now to begin your journey towards finding your
                      perfect pet companion.
                    </p>
                    <Link
                      to="/register?role=0"
                      className=" btn-more px-3 py-1 mt-2 "
                    >
                      Register
                    </Link>{" "}
                    {/* Set role=0 for Adopter */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChoicePage;
