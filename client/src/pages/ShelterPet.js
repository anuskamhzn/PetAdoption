import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const ShelterPet = () => {
  const { shelterId } = useParams(); // Retrieve shelter ID from URL
  const [products, setProducts] = useState([]);
  const [shelterName, setShelterName] = useState('');

  useEffect(() => {
    const fetchProductsByShelter = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/shelter/${shelterId}`);
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

  return (
    <Layout>
      <div>
        <h1>Pets of Shelter: {shelterName}</h1>
        <div className="container">
          <div className="d-flex justify-content-center flex-wrap"    >
            {products?.slice(0, 4).map((p) => (
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
