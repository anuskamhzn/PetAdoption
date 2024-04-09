// ProductDetails.jsx
import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  }, [params.slug]);

  const getSimilarProduct = useCallback(async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }, []);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug, getProduct]);

  const handleAdopt = (productId) => {
    // Logic for adopting a pet
    console.log("Adopting pet with ID:", productId);
  };

  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row container mt-2">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="380px"
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Pet Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Age : {product.age}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <button className="btn btn-primary ms-1" onClick={() => handleAdopt(product._id)}>
              Adopt
            </button>
          </div>
        </div>
      )}
      <hr />
      <div className="row container">
        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                  <NavLink to={`/product/${p.slug}`}>
                  <img 
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
                  </NavLink>

              <div className="card-body" >
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.age}</p>
                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                  More Details
                </button>
                <button className="btn btn-secondary ms-1" onClick={() => handleAdopt(p._id)}>
                  Adopt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
