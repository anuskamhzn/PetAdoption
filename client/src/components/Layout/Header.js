import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { MdOutlinePets } from "react-icons/md";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import SearchInput from "../Form/SearchInput";
import About from "../../pages/About";

const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logout Success');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#add8e6' }}>
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><MdOutlinePets />Pet Pals</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                        <p className="nav-item p-2 pt-3 px-4">
                            <NavLink to="/homepage" className="nav-link active" aria-current="page">Home</NavLink>
                        </p>
                        <p className="nav-item p-2 pt-3 px-4">
                            <NavLink to="/about" className="nav-link active" aria-current="page">About us</NavLink>
                        </p>    <p className="nav-item p-2 pt-3 px-4">
                            <NavLink to="/homepage" className="nav-link active" aria-current="page">Help and Advice</NavLink>
                        </p>    <p className="nav-item p-2 pt-3 px-4">
                            <NavLink to="/pet" className="nav-link active" aria-current="page">Find a Pet</NavLink>
                        </p>    <p className="nav-item p-2 pt-3 px-4">
                            <NavLink to="/contact" className="nav-link active" aria-current="page">Contact us</NavLink>
                        </p>

                        <ul className="navbar-nav">
                            <SearchInput />

                            {auth.user ? (
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.username}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : auth?.user?.role === 2 ? "shelter" : "user"
                                                }`}
                                                className="dropdown-item"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
