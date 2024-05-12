import React from 'react';
import Layout from "../../components/Layout/Layout";
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container-flui p-3 m-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                        <img
                                src={`/api/v1/auth/user-photo/${auth?.user?._id}`}
                                className="card-img-top"
                                alt={auth?.user?.name}
                                style={{ height: "200px", width: "200px" }} // Adjust the height and width as needed
                            />
                            <h4>Name: {auth?.user?.name}</h4>
                            <h4>Email: {auth?.user?.email}</h4>
                            <h4>Address: {auth?.user?.address}</h4>
                            <h4>Phone: {auth?.user?.phone}</h4>
                        </div>
                        <Link to="/dashboard/user/profile" className="btn btn-primary">Update Account</Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;