import React from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Profile</h1>
                        <div className='card w-75 p-3'>
                            <h4>Name: {auth?.user?.name}</h4>
                            <h4>Email: {auth?.user?.email}</h4>
                            <h4>Address: {auth?.user?.address}</h4>
                            <h4>Phone: {auth?.user?.phone}</h4>
                        </div>a
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
