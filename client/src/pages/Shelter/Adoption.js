import React, { useState, useEffect } from "react";
import ShelterMenu from "../../components/Layout/ShelterMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Adoption = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const { data } = await axios.get("/api/v1/adoption"); // Fetch all adoption requests
        setAdoptionRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
        setLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, []); // Fetch adoption requests on mount

  const Approve = async (requestId) => {
    try {
      await axios.patch(`/api/v1/adoption/${requestId}/approve`, {
        status: "approved",
      });
  
      toast.success("Adoption request approved!");
  
      // Refresh adoption requests after approval
      const { data } = await axios.get("/api/v1/adoption");
      setAdoptionRequests(data); // Update state to trigger re-render
    } catch (error) {
      console.error("Error approving adoption request:", error);
      toast.error("Failed to approve adoption request.");
    }
  };

  const Reject = async (requestId) => {
    try {
      await axios.patch(`/api/v1/adoption/${requestId}/reject`, {
        status: "rejected",
      });
  
      toast.success("Adoption request rejected!");
  
      // Refresh adoption requests after rejection
      const { data } = await axios.get("/api/v1/adoption");
      setAdoptionRequests(data); // Update state to trigger re-render
    } catch (error) {
      console.error("Error rejecting adoption request:", error);
      toast.error("Failed to reject adoption request.");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
      <div className="row">
      <div className="col-md-3">
      <ShelterMenu />
      </div>
      <div className="col-md-9">
      <h1>User Adoption Requests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
<div>
  {adoptionRequests.length > 0 ? (
    <table className="adoption-table">
      <thead>
        <tr>
          <th>Pet Name</th>
          <th>Pet Category</th>
          <th>Requested By</th>
          <th>Adoption</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {adoptionRequests.map((request) => (
          <tr key={request._id}>
            <td>{request.productId?.name}</td>
            <td>{request.productId?.category?.name}</td>
            <td>{request.userId?.name}</td>
            <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => Approve(request._id)}
                            >
                              Approve
                            </button>{' '}
                            <button
                              className="btn btn-danger"
                              onClick={() => Reject(request._id)}
                            >
                              Reject
                            </button>
                          </td>
            <td>{request.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No pending adoption requests.</p>
  )}
</div>


        )}
      </div>

      </div>
      </div>
    </Layout>
  );
};

export default Adoption;
