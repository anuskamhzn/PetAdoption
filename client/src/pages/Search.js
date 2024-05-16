import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useParams, useNavigate } from "react-router-dom";

const Search = () => {
  const [values] = useSearch();
    const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Pets Found" : `Found ${values?.results.length}`}</h6>
          <div className="row justify-content-center flex-wrap">
            {values?.results.map((p, index) => ( // Adding "key" prop here
              <div key={index} 
                  className="pet-card col-lg-3 col-md-5 col-sm-5 col-sms-5 m-2 pt-3" style={{ width: "18rem" }}>
                <img 
                  src={`/api/v1/product/product-photo/${p._id}`} 
                  className="pet-image img-fluid" 
                  alt={p.name} 
                  />
                <div className="card-body py-4 px-3">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <div className="d-flex justify-content-between">
                        <p className="card-text">Age: {p.age}</p>

                        <button
                          className="btn-more"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
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
