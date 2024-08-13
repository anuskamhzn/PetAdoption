import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
// Ensure axios post request includes correct field names
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newpassword, phone });
        if (res.data && res.data.success) {
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
            <div className='register'>
                <h1>RESET PASSWORD</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Phone Number' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter New Password' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
