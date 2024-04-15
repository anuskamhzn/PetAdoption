import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Age } from "../components/Age";
import { Breeds } from "../components/breeds";
import wallpaper from "../imag/img.jpg";
import wallp1 from "../imag/first.png";
import wallp2 from "../imag/second.png";
import wallp3 from "../imag/third.png";
import './Style.css'; 

const img = wallpaper;
const im = wallp1;
const img1 = wallp2;
const  img2 = wallp3;

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
            <img src={img} className="img-fluid" alt="" />
            <div className="bg-color">
            <div className="text-center pt-5" style={{ backgroundColor: "#fffff" }}>
            <h1>Why Choose PetPals ?</h1>
            <h6>Because we enable direct pet adoption, from one good home to another.</h6>
            <div className="row justify-content-center pt-5">
    <div className="col-md-4">
        <div className="card border" style={{ width: "18rem" }}>
            <div className="card-body">
                <img className="card-img-top" src={im} alt="Card image cap" style={{ width: "70%", height: "80%" }} />
                <h5 className="card-title">Kind To Everyone</h5>
                <h6>We believe that...</h6>
                <div className="card-text">
                    <p>Every pet deserves to be safe, loved, and respected.</p>
                    <p>People who are great candidates for adoption shouldn't be put off by complicated processes or one-size-fits-all rules.</p>
                    <p>People who need to rehome their pets should be empowered to do so without being judged.</p>
                </div>
            </div>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <img className="card-img-top" src={img1} alt="Card image cap" style={{ width: "50%", height: "50%" }} />
                <h5 className="card-title">Advocate Adoption</h5>
                <div className="card-text">
                    <p>This value sits at the heart of everything we do.</p>
                    <p>Adoption reduces the demand for puppy farming, industrial-scale breeding, illegal pet imports, and other forms of exploitation and abuse.</p>
                    <p>We’re proud supporters of #AdoptDontShop.</p>
                </div>
            </div>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <img className="card-img-top" src={img2} alt="Card image cap" style={{ width: "40%", height: "40%" }} />
                <h5 className="card-title">Responsible Rehoming</h5>
                <div className="card-text">
                    <p>We’re champions of rehoming. But not at any cost.</p>
                    <p>We believe in finding the right match between adopters and pets, not taking risks or rushing.</p>
                    <p>We always prioritize pet welfare. And we offer a safer, more ethical, and professional alternative to online marketplaces like Preloved, Pets4Homes, Facebook, and Gumtree.</p>
                </div>
            </div>
        </div>
    </div>
</div>

        </div>
        <div className="text-center pt-5 pb-5 pl-5 pr-5" > {/* Adding pt-5, pb-5, pl-5, pr-5 for padding on all sides */}
    <h1>Straightforward Pet Rehoming And Adoption</h1>
    <p>PetRehomer is a new digital platform with real people behind the scenes. Our platform connects potential adopters with people who need to rehome their pets. This makes it easier for good people to adopt the right pet whilst maximising the chance of pets finding their forever home.</p>
    <p>We offer a non-judgmental service to rehomers and give them full control of the process.</p>
    <p>We're also helping to reduce the number of animals going into shelters. This frees up space and resources for the pets who have been abandoned, need immediate help or specialist care.</p>
</div>


            <div className="row mt-3">
                {/* <div className="col-md-3 ps-md-4">
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
                </div> */}
                <div className="col-md-9">
    <h1 className="text-center">Featured Pets</h1>
    <div className="container">
    <div className="d-flex justify-content-center flex-wrap" style={{paddingLeft:"150px"}}>
        {products?.slice(0, 6).map((p) => (
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
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className="btn btn-secondary">Adopt</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
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
            </div>
            </Layout>
    );
};

export default HomePage;
