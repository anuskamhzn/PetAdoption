// Register.js
import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import pethouse from "../../imag/pethouse.png";


const SRegister = () => {
    const { search } = useLocation(); // Use useLocation to access query parameters
    const queryParams = new URLSearchParams(search);
    const role = queryParams.get('role'); // Get role parameter from URL
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pan,setpan] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/sregister`, { name, username,email, password, pan, phone, address, role }); // Include role in the request body
            if (res.data.success) {
                // Display toast notification upon successful registration
                toast.success(res.data.message);
                navigate('/login');
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
            <div className='register row'>
            <div className="col-md-5">
          {" "}
          <img
            src={pethouse}
            className="img-fluid"
            data-aos="fade"
            data-aos-offset="100"
          ></img>
        </div>{" "}
        <div className="col-md-5 p-4">

                <h1>Register As Shelter</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Name' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter User Name' required />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={pan} onChange={(e) => setpan(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Pan No' required />
                    </div>

                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Phone no.' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Address' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        </Layout>
    )
}

export default SRegister;
