import React from "react";
import { Link } from "react-router-dom";
import bg from "../imag/Aboutus.jpg";
import Layout from "./../components/Layout/Layout";

import SubBanner from "./SubBanner";
import Footer from "../components/Layout/Footer.js";
import Top from "./AboutUs/Top";
import Middle from "./AboutUs/Middle";
import Choosing from "./ChoosingUs";
// import Card from "./CaseStudy";

const About = () => {
  return (
    <Layout>
<<<<<<< HEAD
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
=======
      {/* Banner Section  */}
      <section>
        <SubBanner heading="About Us" subHeading="Home /About Us" img={bg} />
      </section>

      {/* Top Section  */}
      <section>
        <Top />
      </section>
      <section>
        <Choosing />
      </section>
      {/* Middle Section  */}
      <section>
        <Middle />
      </section>

      {/* Bottom Section  */}
      {/* <section>
        <Card />
      </section> */}

      {/* Footer Section  */}
      <section>
        <Footer />
      </section>
>>>>>>> ecc9a4699cd1e5850ac248502695eb1944024d65
    </Layout>
  );
};

export default About;
