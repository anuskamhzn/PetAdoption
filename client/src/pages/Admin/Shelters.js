import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu'; // Import AdminMenu directly

const Shelters = () => {
    const [pendingShelters, setPendingShelters] = useState([]);

  useEffect(() => {
    fetchPendingShelters();
  }, []);

  const fetchPendingShelters = async () => {
    try {
      const res = await axios.get('/api/admin/pending-shelters');
      setPendingShelters(res.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleApproveShelter = async (shelterId) => {
    try {
      const res = await axios.put(`/api/admin/approve-shelter/${shelterId}`);
      console.log(res.data);
      // Update UI or show success message
      // After approval, fetch updated pending shelters
      fetchPendingShelters();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleRejectShelter = async (shelterId) => {
    try {
      const res = await axios.put(`/api/admin/reject-shelter/${shelterId}`);
      console.log(res.data);
      // Update UI or show success message
      // After rejection, fetch updated pending shelters
      fetchPendingShelters();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
    return (
        <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                <div>
      <h2>Pending Shelters</h2>
      <ul>
        {pendingShelters.map((shelter) => (
          <li key={shelter._id}>
            {shelter.name}
            <button onClick={() => handleApproveShelter(shelter._id)}>Approve</button>
            <button onClick={() => handleRejectShelter(shelter._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default Shelters;
