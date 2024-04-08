import React from 'react';
import { NavLink } from 'react-router-dom';

const ShterMenu = () => {
    return (
            <div className='text-center'>
                <div className="list-group">
                    <h4>Shelter Dashboard</h4>
                    <NavLink to="/dashboard/shelter/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                    {/* <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink> */}
                </div>
            </div>
    );
};

export default ShterMenu;
