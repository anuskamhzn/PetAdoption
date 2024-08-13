import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [values] = useSearch();
  const [adoptionStatuses, setAdoptionStatuses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdoptionStatuses = async () => {
      try {
        const statuses = await Promise.all(
          values?.results.map(async (pet) => {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/adoption/status/${pet._id}`);
            return { id: pet._id, status: data.status };
          })
        );
        const statusMap = statuses.reduce((acc, { id, status }) => {
          acc[id] = status;
          return acc;
        }, {});
        setAdoptionStatuses(statusMap);
      } catch (error) {
        console.error("Error fetching adoption statuses:", error);
      }
    };

    fetchAdoptionStatuses();
  }, [values?.results]);

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 10,
  };

  const cardStyle = {
    position: "relative",
    width: "18rem",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Pets Found" : `Found ${values?.results.length}`}</h6>
          <div className="row justify-content-center flex-wrap">
            {values?.results.map((p, index) => (
              <div
                key={index}
                className="pet-card col-lg-3 col-md-5 col-sm-5 col-sms-5 m-2 pt-3"
                style={cardStyle}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="pet-image img-fluid"
                  alt={p.name}
                  style={imageStyle}
                />
                {adoptionStatuses[p._id] === "approved" && (
                  <div style={overlayStyle}>Pet Adopted</div>
                )}
                <div className="card-body py-4 px-3">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Age: {p.age}</p>
                    <button
                      className="btn-more"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      disabled={adoptionStatuses[p._id] === "approved"}
                    >
                      {adoptionStatuses[p._id] === "approved" ? "Pet Adopted" : "More Details"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
