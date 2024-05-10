import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const ShelterS = () => {
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

  // Filter users based on the selected role
  useEffect(() => {
    if (filter !== null) {
      const filtered = users.filter((user) => user.role === 2);
      setFilteredUsers(filtered);
    } else {
      // If no filter is selected, show all users
      setFilteredUsers(users);
    }
  }, [filter, users]);

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h1>All Users</h1>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <Link to={`/shelter/${user._id}`}>{user.name}</Link>
                      </td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShelterS;
