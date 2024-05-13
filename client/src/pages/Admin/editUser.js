import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";

const EditUser = () => {
    
  const [auth] = useAuth();
  const { userId } = useParams(); // Retrieve user ID from URL
  const [user, setUser] = useState(null); // State to store user data
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/user-info/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUserName(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Create a FormData object to send file data
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("photo", photo); // Append the selected photo to the form data
  
      const { data } = await axios.put(`/api/v1/auth/profile/${userId}`, formData); // Assuming you have an endpoint to update user profile
  
      if (data?.error) {
        toast.error(data.error);
      } else {
        setUser(data.updatedUser);
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Layout title={"Edit User"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">EDIT USER PROFILE</h4>
                {/* File input for photo */}
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="form-control"
                    id="photoInput"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Username"
                    disabled={!auth.isAdmin && userId !== auth.user.id}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email"
                    disabled={!auth.isAdmin}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                    disabled={!auth.isAdmin}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                    disabled={!auth.isAdmin}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                    disabled={!auth.isAdmin}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
