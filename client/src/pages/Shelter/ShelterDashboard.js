import React from "react";
import Layout from "../../components/Layout/Layout";
import ShelterMenu from "../../components/Layout/ShelterMenu";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom"; // Import Link component from React Router

const ShelterDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-flui p-3 m-3 pt-4 dashboard">
        <div className="row ">
          <div className="col-md-3">
            <ShelterMenu />
          </div>
          <div className="col-md-9 mt-4">
            <h1>Profile</h1>
            <div className="row"></div>
            <div className="card w-75 p-3">
              <div className="row">
                <div className="col-md-5 d-flex align-items-center justify-content-center">
                  {" "}
                  <img
                    src={`/api/v1/auth/user-photo/${auth?.user?._id}`}
                    className="img-fluid"
                    alt={auth?.user?.name}
                    style={{ width: "100%" }} // Adjust the height and width as needed
                  />
                </div>
                <div className="col-md-5 d-flex flex-column  justify-content-center">
                  <h5 className="py-3">Name: {auth?.user?.name}</h5>
                  <h5 className="py-3">Email: {auth?.user?.email}</h5>
                  <h5 className="py-3">Address: {auth?.user?.address}</h5>
                  <h5 className="py-3">Phone: {auth?.user?.phone}</h5>
                  <Link
                    to="/dashboard/shelter/profiles"
                    className="px-3 py-1 btn-more"
                  >
                    Update Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShelterDashboard;
