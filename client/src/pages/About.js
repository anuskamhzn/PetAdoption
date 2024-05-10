import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="about"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">About US</h1>
          <p className="text-justify mt-2">
          Welcome to PetPals, where hearts meet paws. We're dedicated to connecting loving homes with furry companions in need. 
          Our mission is simple: to make the adoption process as seamless and joyful as possible for both pets and their new families. 
          At PetPals, we believe every animal deserves a forever home filled with love and care. Join us in our mission to create happy tails and lifelong friendships.
          </p>
          <Link to="/homepage" className="pnf-btn">
          Go Back
        </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;