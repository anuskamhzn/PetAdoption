import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Age } from "../components/Age";
import { Breeds } from "../components/breeds";
import wallpaper from "../imag/img.jpg";

const img = wallpaper;

const FindAPet = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

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
      // Fetch adoption status for each product
      const productsWithStatus = await Promise.all(
        data.products.map(async (product) => {
          const adoptionStatus = await getAdoptionStatus(product._id);
          return { ...product, adoptionStatus };
        })
      );
      setLoading(false);
      setProducts(productsWithStatus);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Fetch adoption status for a product
  const getAdoptionStatus = async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/adoption/status/${productId}`);
      return data.status;
    } catch (error) {
      console.error("Error fetching adoption status:", error);
      return null;
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
    getAllProducts();
  }, [page]); // Ensure useEffect runs on page change

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
        breeds: breeds.filter((breed) => checked.includes(breed)),
      });
      // Fetch adoption status for filtered products
      const productsWithStatus = await Promise.all(
        data.products.map(async (product) => {
          const adoptionStatus = await getAdoptionStatus(product._id);
          return { ...product, adoptionStatus };
        })
      );
      setLoading(false);
      setProducts(productsWithStatus);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-3 grey">
          <div className="col-md-3 col-sm-5 col-sms-9 ps-md-4 ">
            <div className="filter">
              <h4 className="mb-3">Filter By Category</h4>
              <div className="row flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="filter">
              <h4 className="mt-3">Filter by Breed</h4>
              <div className="d-flex flex-column">
                {breeds.map((breed) => (
                  <Checkbox
                    key={breed}
                    onChange={(e) => handleFilter(e.target.checked, breed)}
                    className="mb-2"
                  >
                    {breed}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="filter">
              <h4 className=" mt-3">Filter By Age</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Age?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column mt-3">
                <button
                  className="btn btn-more"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-7 col-sms-9">
            <div className="row all-pets">
              <h1 className="text-center">All Pets</h1>
              {products?.length === 0 ? (
                <p className="text-center">Not found</p>
              ) : (
                products?.map((p) => (
                  <div
                    className="pet-card col-lg-3 col-md-5 col-sm-5 col-sms-5 col-sms-10 m-2 pt-2"
                    key={p._id}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget;
                      const button = card.querySelector('.btn-more');
                      if (p.adoptionStatus === "approved") {
                        button.textContent = "Pet Adopted";
                        button.disabled = true;
                      }
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      const button = card.querySelector('.btn-more');
                      button.textContent = "More Details";
                      button.disabled = false;
                    }}
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
                      </p>
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindAPet;
