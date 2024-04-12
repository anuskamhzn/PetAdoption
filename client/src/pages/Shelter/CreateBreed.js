import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
// import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import BreedForm from "../../components/Form/BreedForm";
import { Modal } from 'antd'; // Import Modal component from Ant Design
import ShelterMenu from "../../components/Layout/ShelterMenu";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateBreed = () => {
    const [categories, setCategories] = useState([]);
    const [breeds, setBreed] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [name, setName] = useState("");

        //get all category
        const getAllCategory = async () => {
            try {
                const { data } = await axios.get("/api/v1/category/get-category");
                if (data?.success) {
                    setCategories(data.category);
                }
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong in getting category");
            }
        };
    
        useEffect(() => {
            getAllCategory();
        }, []);

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/breed/create-breed", {
                name
            });
            if (data?.success) {
                toast.success(`${data.name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };

    // //get all category
    // const getAllCategory = async () => {
    //     try {
    //         const { data } = await axios.get("/api/v1/breed/get-breed");
    //         if (data.success) {
    //             setBreed(data.breed);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Something went wrong in getting breed");
    //     }
    // };

    // useEffect(() => {
    //     getAllCategory();
    // }, []);

    // update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/breed/update-breed/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/breed/delete-breed/${pId}`
            );
            if (data.success) {
                toast.success(`Breed is deleted`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <ShelterMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Breeds</h1>
                        <Select
                                variant={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategories(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                        <div className="col-md-9">
                            <BreedForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {breeds && breeds.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => {
                                                        handleDelete(c._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            {/* Add modal content here */}
                            <BreedForm
                                value={updatedName}
                                setValue={setUpdatedName} // Set the value using setValue
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateBreed;
