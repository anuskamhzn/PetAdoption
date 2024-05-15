import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Age } from "../components/Age";
import { Breeds } from "../components/breeds";
import wallpaper from "../imag/img.png";
import wallp1 from "../imag/first.png";
import wallp2 from "../imag/second.png";
import wallp3 from "../imag/third.png";
import Hero from "./Hero.jsx";
import ChoosingUs from "./ChoosingUs/ChoosingUs.js";
import Real from "./Real";
import Straight from "./Straighome";
import "./Style.css";

const img = wallpaper;
const im = wallp1;
const img1 = wallp2;
const img2 = wallp3;

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState([]);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
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
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
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

  // Load more products
  const loadMore = () => {
    setPage(page + 1);
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      // If the category is being selected, add it to the checked array
      if (!all.includes(id)) {
        all.push(id);
      }
    } else {
      // If the category is being deselected, remove it from the checked array
      all = all.filter((c) => c !== id);
    }
    setChecked(all);

    // Update breeds based on selected categories
    const selectedBreeds = categories
      .filter((category) => all.includes(category._id))
      .flatMap((category) => Breeds[category.name.toLowerCase()] || []);
    setBreeds(selectedBreeds);
  };

  // Filter products based on category, breed, and age
  useEffect(() => {
    filterProducts();
  }, [checked, radio]);

  const filterProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
        breeds: breeds.filter((breed) => checked.includes(breed)), // Include selected breeds
      });
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <Hero></Hero>
      <Real></Real>
      {/* <div className="bg-color"> */}

      <div
        className="text-center pt-5 pb-5 pl-5 container "
        data-aos="slide-up"
        data-aos-offset="100"
      >
        <ChoosingUs></ChoosingUs> <Straight></Straight>
        {/* Adding pt-5, pb-5, pl-5, pr-5 for padding on all sides */}
      </div>

      <div className="mt-3">
        <div className="Featured">
          <h1 className="text-center">Featured Pets</h1>
          <div className="container">
            <div className="row justify-content-center flex-wrap">
              {products?.slice(0, 6).map((p) => (
                <div
                  className="pet-card col-lg-3 col-md-5 col-sm-5 col-sms-9 m-2 pt-3"
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="pet-image img-fluid"
                    alt={p.name}
                  />
                  <div className="card-body py-4 px-3">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>{" "}
                    <div className="d-flex justify-content-between">
                      <p className="card-text">Age: {p.age}</p>
                      <button
                        className="btn-more "
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
      </div>

      {/* </div> */}
    </Layout>
  );
};

export default HomePage;
