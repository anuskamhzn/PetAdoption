import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import pethouse from "../../imag/pethouse.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data)); // Update localStorage
        navigate(location.state || "/homepage");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className=" container">
        <div className="container">
          <div className="register container">
            <h1 data-aos="fade" data-aos-offset="200">
              Login To PetPals
            </h1>
            <img src={pethouse} data-aos="fade" data-aos-offset="100"></img>
            <form onSubmit={handleSubmit}>
              <div className="mb-3" data-aos="slide-up" data-aos-offset="100">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-3" data-aos="slide-up" data-aos-offset="100">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="mb-3" data-aos="slide-up" data-aos-offset="100">
                <NavLink to="/forgot-password" className="btn btn-link">
                  Forgot Password?
                </NavLink>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-login mx-1 "
                data-aos="slide-up"
                data-aos-offset="100"
              >
                Login
              </button>
              <NavLink
                to="/choice-page"
                className="btn btn-secondary btn-login mx-1"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                Register
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;