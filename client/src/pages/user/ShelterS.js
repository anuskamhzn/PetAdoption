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
        const filteredUsers = data.user.filter(
          (user) => user.role === 2 && user.name !== "admin"
        );
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
      <div className="container mt-5 pt-3">
        <div className="row align-item-center justify-content-center">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-lg-9 col-md-9  mt-4">
            <div className=" grey">
              <h1 className="text-center">All Shelters</h1>

              <div className="d-flex justify-content-center flex-wrap">
                {filteredUsers.map((user) => (
                  <div
                    className="pet-card col-lg-3 col-md-5 col-sm-5 col-sms-5 m-2 text-start "
                    key={user._id}
                  >
                    <div className="card">
                      <div className="card-body py-4 px-3">
                        <h5 className="card-title">
                          <img
                            src={`/api/v1/auth/user-photo/${user?._id}`}
                            className="pet-image img-fluid"
                            alt={user?.name}
                            style={{
                              height: "200px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <h6>{user.name}</h6>
                          <h6>{user.address}</h6>
                          <button className="btn-more">
                            <Link
                              to={`/shelter/${user._id}`}
                              className="link"
                              style={{ color: "white" }}
                            >
                              View Pets
                            </Link>
                          </button>
                        </h5>
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

export default Shelters;
