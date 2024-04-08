import React from 'react';
import Layout from "../../components/Layout/Layout";
import ShelterMenu from '../../components/Layout/ShelterMenu';
import { useAuth } from '../../context/auth';

const ShelterDashboard = () => {
    const [auth ] = useAuth();
    return (
        <Layout>
        <div className="container-flui p-3 m-3">
                <div className='row'>
                    <div className='col-md-3'>
                    <ShelterMenu />
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                        <h3>{auth?.user?.name}</h3>
                        <h3>{auth?.user?.email}</h3>
                        <h3>{auth?.user?.address}</h3>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default ShelterDashboard;