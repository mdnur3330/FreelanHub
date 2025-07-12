import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import MenuItem from './MenuItem';

const AdminHome = () => {
    return (
        <div>
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='dmin Overview'
                    address='admin-overview'
                  />
        </div>
    );
};

export default AdminHome;