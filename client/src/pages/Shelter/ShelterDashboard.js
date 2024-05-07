import React from 'react';
import Layout from "../../components/Layout/Layout";
import ShelterMenu from '../../components/Layout/ShelterMenu';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom'; // Import Link component from React Router

const ShelterDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container-flui p-3 m-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <ShelterMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Profile</h1>
                        <div className='card w-75 p-3'>
                            <h4>Name: {auth?.user?.name}</h4>
                            <h4>Email: {auth?.user?.email}</h4>
                            <h4>Address: {auth?.user?.address}</h4>
                            <h4>Phone: {auth?.user?.phone}</h4>
                        </div>
                        <Link to="/dashboard/shelter/profiles" className="btn btn-primary">Update Account</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ShelterDashboard;
