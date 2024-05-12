import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Shelters = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState(null);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      if (data.success) {
        const filteredUsers = data.user.filter((user) => user.role === 2 && user.name !== "admin");
        setUsers(filteredUsers);
        // Initially, set filtered users to all users
        setFilteredUsers(filteredUsers);
      } else {
        toast.error("Failed to get users");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Shelters</h1>
            <div className="row">
              {filteredUsers.map((user) => (
                <div className="col-md-4 mb-3" key={user._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                      <img
                        src={`/api/v1/auth/user-photo/${user?._id}`}
                        className="card-img-top"
                        alt={user?.name}
                        style={{ height: "200px", width: "100%", objectFit: "cover" }}
                      />
                        <Link to={`/shelter/${user._id}`}>{user.name}</Link>
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shelters;
