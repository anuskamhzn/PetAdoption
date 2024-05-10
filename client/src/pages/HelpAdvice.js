import React from "react";
import { Link } from "react-router-dom";
import bg from "../imag/helpadvice.jpg";
import Layout from "./../components/Layout/Layout";

import SubBanner from "./SubBanner";
import Footer from "../components/Layout/Footer.js";
import Top from "./AboutUs/Top";
import Testimonials from "./Testimonial";
import Choosing from "./ChoosingUs";
import Straight from "./Straighome";
import Menu from "./Menu";

// import Card from "./CaseStudy";

const About = () => {
  return (
    <Layout>
      {/* Banner Section  */}
      <section>
        <SubBanner
          heading="Help and Advice"
          subHeading="Home / Help and Advice"
          img={bg}
        />
      </section>

      {/* Top Section  */}

      {/* Middle Section  */}

      <section>
        <div
          className="text-center pt-5 pb-5 pl-5 container "
          data-aos="slide-up"
          data-aos-offset="100"
        >
          <Straight></Straight>
          <Menu />
          {/* Adding pt-5, pb-5, pl-5, pr-5 for padding on all sides */}
        </div>{" "}
      </section>
      {/* Bottom Section  */}
      {/* <section>
        <Card />
      </section> */}

      {/* Footer Section  */}
    </Layout>
  );
};

export default About;
