import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState(null);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      if (data.success) {
        const filteredUsers = data.user.filter((user) => user.name !== "admin");
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

  // Filter users based on the selected role
  useEffect(() => {
    if (filter !== null) {
      const filtered = users.filter((user) => user.role === filter);
      setFilteredUsers(filtered);
    } else {
      // If no filter is selected, show all users
      setFilteredUsers(users);
    }
  }, [filter, users]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 pt-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 pt-4">
            <h1>All Users</h1>
            <div className="w-75">
              <div className="btn-group mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => setFilter(2)}
                >
                  Show Shelters
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setFilter(0)}
                >
                  Show Adopters
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setFilter(null)}
                >
                  Show All
                </button>
              </div>
              <div className="row justify-content-center flex-wrap">
                {filteredUsers.map((user) => (
                  <div className="pet-card col-lg-3 col-md-5 col-sm-5 col-sms-5 m-2 pt-3" key={user._id}>
                    <div className="card">
                    <div className="card-body py-4 px-3">
                    <img
                        src={`/api/v1/auth/user-photo/${user?._id}`}
                        className="pet-image img-fluid"
                        alt={user?.name}
                        style={{ height: "200px", width: "100%", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`/user-info/${user._id}`} className="link">{user.name}</Link>
                          <h6>{user.address}</h6>
                        </h5>
                      </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
