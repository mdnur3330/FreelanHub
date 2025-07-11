import React from 'react';
import WorkerHome from './WorkerHome';
import BuyerHome from './BuyerHome';
import AdminHome from './AdminHome';

const Sidebar = () => {
    return (
        <div>
            <WorkerHome></WorkerHome>
            <BuyerHome></BuyerHome>
            <AdminHome></AdminHome>
        </div>
    );
};

export default Sidebar;