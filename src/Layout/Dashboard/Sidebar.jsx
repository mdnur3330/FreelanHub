import React from 'react';
import WorkerHome from './WorkerHome';
import BuyerHome from './BuyerHome';
import AdminHome from './AdminHome';
import useRoll from '../../Hooqs/getRol';
import { CgProfile } from "react-icons/cg";
import MenuItem from './MenuItem';

const Sidebar = () => {
    const [role] = useRoll()
    return (
        <div>
            <MenuItem
                    icon={CgProfile}
                    label='Profile'
                    address='/dashboard'
                  />
            {role?.role === "Worker" && <WorkerHome></WorkerHome>}
            {role?.role === "Buyer" &&  <BuyerHome></BuyerHome>}
            {role?.role === "Admin" &&  <AdminHome></AdminHome>}
        </div>
    );
};

export default Sidebar;