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
            .filter(category => all.includes(category._id))
            .flatMap(category => Breeds[category.name.toLowerCase()] || []);
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
                breeds: breeds.filter(breed => checked.includes(breed)) // Include selected breeds
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
            <div className="row mt-3">
                <div className="col-md-3 ps-md-4">
                    <h4 className="text-center mb-3">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h6 className="mt-3">Filter by Breed</h6>
                    <div className="d-flex flex-column">
                        {breeds.map(breed => (
                            <Checkbox key={breed} onChange={(e) => handleFilter(e.target.checked, breed)} className="mb-2">
                                {breed}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className="text-center mt-3">Filter By Age</h4>
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
                            className="btn btn-warning"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Pets</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
    <img
        src={`/api/v1/product/product-photo/${p._id}`}
        className="card-img-top"
        alt={p.name}
        style={{ height: "200px" }} // Adjust the height as needed
    />
    <div className="card-body">
        <h5 className="card-title">{p.name}</h5>
        <p className="card-text">{p.description.substring(0, 30)}</p>
        <p className="card-text">Age: {p.age}</p>
        <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
        <button className="btn btn-secondary ms-1">Adopt</button>
    </div>
</div>

                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={loadMore}
                            >
                                {loading ? "Loading ..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FindAPet;
