import React from 'react';
import Layout from '../../components/Layout/Layout';
import ShelterMenu from '../../components/Layout/ShelterMenu';

const Profiles = () => {
    return (
        <Layout>
            <div className="container-flui p-3 m-3">
                <div className='row'>
                    <div className='col-md-3'>
                    <ShelterMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Profile</h1>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default Profiles; 