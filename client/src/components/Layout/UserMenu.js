import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
            <div className='text-center' style={{ paddingTop: '20px' }}>
                <div className="list-group">
                <NavLink to="/dashboard/user" style={{ color: 'black' }}>
                    <h4>User Panel</h4>
                </NavLink>
                    {/* <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink> */}
                    <NavLink to="/dashboard/user/adopt" className="list-group-item list-group-item-action">Adopt Pet Notification</NavLink>
                    <NavLink to="/dashboard/user/shelter-list" className="list-group-item list-group-item-action">Shelters</NavLink>
                    {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink> */}
                </div>
            </div>
    );
};

export default UserMenu;
