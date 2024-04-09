import React from 'react';
import { NavLink } from 'react-router-dom';

const ShterMenu = () => {
    return (
            <div className='text-center'>
                <div className="list-group">
                <NavLink to="/dashboard/shelter" style={{ textDecoration: 'none' }}>
                    <h4>Shelter Panel</h4>
                </NavLink>
                    {/* <NavLink to="/dashboard/shelter/profiles" className="list-group-item list-group-item-action">Profile</NavLink> */}
                    <NavLink to="/dashboard/shelter/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/shelter/products" className="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/dashboard/shelter/profiles" className="list-group-item list-group-item-action">Profile</NavLink>
                </div>
            </div>
    );
};

export default ShterMenu;
