import React, { useState, useEffect } from "react";
// import AdminMenu from "../components/Layout/AdminMenu";
import ShelterMenu from "../components/Layout/ShelterMenu";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <ShelterMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Pets List</h1>
          <div className="row">
            {products?.map((p) => (
              <div key={p._id} className="col-md-4 mb-3">
                <Link to={`/dashboard/shelter/product/${p.slug}`} className="product-link">
                  <div className="card">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0, 40)}...</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
