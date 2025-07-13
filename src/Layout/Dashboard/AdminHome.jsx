import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import MenuItem from './MenuItem';

const AdminHome = () => {
    return (
        <div>
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='Admin Overview'
                    address='admin-overview'
                  />
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='Withdraw Request'
                    address='withdraw-request'
                  />
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='Manage Users'
                    address='manage-users'
                  />
        </div>
    );
};

export default AdminHome;