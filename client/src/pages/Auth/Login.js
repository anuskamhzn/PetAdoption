import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

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
                navigate(location.state || '/homepage');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout>
            <div className='register'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required />
                    </div>
                    <div className='mb-3'>
                        <NavLink to="/forgot-password" className="btn btn-link">Forgot Password?</NavLink>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <NavLink to="/choice-page" className="btn btn-secondary ms-2">Register</NavLink>
                </form>
            </div>
        </Layout>
    )
}

export default Login;
