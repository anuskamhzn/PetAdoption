import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";

const Userinfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/user-info/${userId}`);
        setUserInfo(response.data.user);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const edit = async () => {
    navigate(`/dashboard/admin/edituser/${userId}`);
  }

  //delete a product
  const handleDelete = async () => {
    try {
      // Confirm deletion request
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (!confirmed) return;
      await axios.delete(`/api/v1/auth/delete-user/${userId}`);
      toast.success("User Deleted Successfully");
      navigate("/dashboard/admin/users");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-center" style= {{paddingTop: "50px" }}>User Info</h1>
        {error && <div>Error: {error}</div>}
        {userInfo && (
          <div className="container">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <img
                    src={`/api/v1/auth/user-photo/${userInfo._id}`}
                    className="card-img-top"
                    alt={userInfo.name}
                    style={{ height: "200px", width: "200px" }} // Adjust the height and width as needed
                  />
                  <h4 className="card-title">Name: {userInfo.name}</h4>
                  <p className="card-text">Email: {userInfo.email}</p>
                  <p className="card-text">Address: {userInfo.address}</p>
                  <p className="card-text">Phone: {userInfo.phone}</p>
                </div>
                {/* <button onClick={edit} className="btn btn-primary">Edit</button> */}
                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Userinfo;
