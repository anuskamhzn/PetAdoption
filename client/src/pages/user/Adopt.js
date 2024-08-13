import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Adopt = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth]= useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/adoption/notifications`);
        console.log("Fetched notifications:", response.data); // Log the fetched data
        setNotifications(response.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
  
      }
    };

    fetchNotifications(); // Fetch data on component mount
  }, [auth.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 pt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-4 pt-3">
            <h1>Adoption Notifications</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {notifications.length > 0 ? (
                  <div className="card-list">
                    {notifications.map((notification) => (
                      <div key={notification._id} className="card">
                        <div className="card-body">
                          <p className="card-text">{notification.message}</p>{" "}
                          {/* Display the message */}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No notifications found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adopt;
