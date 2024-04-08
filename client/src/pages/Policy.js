import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/policy.jpg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">Policy</h1>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <Link to="/" className="pnf-btn">
          Go Back
        </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;