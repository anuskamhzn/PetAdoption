import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const ShelterPet = () => {
  const navigate = useNavigate();
  const { shelterId } = useParams(); // Retrieve shelter ID from URL
  const [products, setProducts] = useState([]);
  const [shelterName, setShelterName] = useState('');
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchProductsByShelter = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/shelter/${shelterId}`);
        if (data.success) {
          setProducts(data.products); // Store fetched products
          setShelterName(data.shelterName);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products by shelter:", error);
      }
    };

    fetchProductsByShelter(); // Fetch products when the component mounts
  }, [shelterId]);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
    getAllProducts();
  }, [page]); // Ensure useEffect runs on page change

  return (
    <Layout>
      <div>
        <h1 style={{paddingTop:"50px"}}>Pets of Shelter: {shelterName}</h1>
        <div className="container-fluid m-3 p-3 pt-4">
          <div className="d-flex justify-content-center flex-wrap"    >
            {products?.slice(0, 4).map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px" }} // Adjust the height as needed
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">Age: {p.age}</p>
                  <button
                    className="btn-more"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShelterPet;
