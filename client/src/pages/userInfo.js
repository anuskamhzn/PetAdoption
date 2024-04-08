import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const UserInfo = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <h1>User Info Page</h1>
      {auth.user ? (
        <div>
          <p>Name: {auth.user.name}</p>
          <p>Email: {auth.user.email}</p>
          {/* Add other user properties as needed */}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </Layout>
  );
};

export default UserInfo;
