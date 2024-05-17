import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    
    return (
        <div className='text-center' style={{ paddingTop: '20px' }}> {/* Added inline style for padding top */}
            <div className="list-group">
                <NavLink to="/dashboard/admin" style={{ color:'black' }}>
                    <h4>Admin Panel</h4>
                </NavLink>
                
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Manage Category</NavLink>
                {/* <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink> */}
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink>
            </div>
            <div>
            </div>
        </div>
    );
};

export default AdminMenu;
