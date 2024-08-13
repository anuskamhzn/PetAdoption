import React, { useState, useEffect } from "react";
import ShelterMenu from "../../components/Layout/ShelterMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Adoption = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        // Token is included automatically due to axios defaults
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/adoption`);
        console.log("Fetched adoption requests:", data); // Debug log
        setAdoptionRequests(data);
      } catch (error) {
        console.error("Error fetching adoption requests:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, [auth.token]); // Refetch if token changes

  const handleAction = async (requestId, action) => {
    try {
      if (action === "approve") {
        await axios.patch(`${process.env.REACT_APP_API}/api/v1/adoption/${requestId}/approve`, {
          status: "approved",
        });
        toast.success("Adoption request approved!");

        const petId = adoptionRequests.find(
          (request) => request._id === requestId
        ).productId?._id;
        const otherRequests = adoptionRequests.filter(
          (request) =>
            request.productId?._id === petId && request._id !== requestId
        );

        await Promise.all(
          otherRequests.map(async (otherRequest) => {
            await axios.patch(`${process.env.REACT_APP_API}/api/v1/adoption/${otherRequest._id}/reject`, {
              status: "rejected",
            });
          })
        );
        toast.success("All other adoption requests for this pet are rejected!");

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/adoption`);
        setAdoptionRequests(data);
      } else if (action === "reject") {
        await axios.patch(`${process.env.REACT_APP_API}/api/v1/adoption/${requestId}/reject`, {
          status: "rejected",
        });
        toast.success("Adoption request rejected!");

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/adoption`);
        setAdoptionRequests(data);
      }
    } catch (error) {
      console.error(
        `Error ${
          action === "approve" ? "approving" : "rejecting"
        } adoption request:`,
        error.response?.data || error.message
      );
      toast.error(
        `Failed to ${
          action === "approve" ? "approve" : "reject"
        } adoption request.`
      );
    }
  };

  return (
    <Layout>
      <div className='container-fluid m-3 p-3 pt-4'>
        <div className='row'>
          <div className="col-md-3">
            <ShelterMenu />
          </div>
          <div className="col-md-9 pt-4">
            <h1>User Adoption Requests</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {adoptionRequests.length > 0 ? (
                  <table className="adoption-table">
                    <thead>
                      <tr>
                        <th>Pet Name</th>
                        <th>Pet Category</th>
                        <th>Requested By</th>
                        <th>Adoption</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adoptionRequests.map((request) => (
                        <tr key={request._id}>
                          <td>{request.productId?.name}</td>
                          <td>{request.productId?.category?.name}</td>
                          <td>{request.userId?.name}</td>
                          <td>
                            {request.status === "pending" && (
                              <>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    handleAction(request._id, "approve")
                                  }
                                >
                                  Approve
                                </button>{" "}
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleAction(request._id, "reject")
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {request.status === "approved" && (
                              <span className="text-success">Approved</span>
                            )}
                            {request.status === "rejected" && (
                              <span className="text-danger">Rejected</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No pending adoption requests.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adoption;
