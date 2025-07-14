import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import MenuItem from './MenuItem';
import { MdAssignment, MdDashboardCustomize, MdManageAccounts, MdRequestQuote } from 'react-icons/md';

const AdminHome = () => {
    return (
        <div>
            <MenuItem
                    icon={MdDashboardCustomize}
                    label='Admin Overview'
                    address='admin-overview'
                  />
            <MenuItem
                    icon={MdRequestQuote}
                    label='Withdraw Request'
                    address='withdraw-request'
                  />
            <MenuItem
                    icon={MdManageAccounts}
                    label='Manage Users'
                    address='manage-users'
                  />
            <MenuItem
                    icon={MdAssignment}
                    label='Manage Task'
                    address='manage-task'
                  />
        </div>
    );
};

export default AdminHome;