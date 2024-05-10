import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Contactus from "./ContactUsForm";
const Contact = () => {
  return (
    <Layout>
      <Contactus></Contactus>
    </Layout>
  );
};

export default Contact;
