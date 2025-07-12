import React from 'react';
import MenuItem from './MenuItem';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';

const BuyerHome = () => {
    return (
        <div>
             <>
               <MenuItem
        icon={MdOutlineManageHistory}
        label='Add New Task'
        address='add-task'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='My Tasks'
        address='my-task'
      />
      <MenuItem icon={MdHomeWork} label='Task To Review' address='task-to-review' />
      <MenuItem icon={MdHomeWork} label='Purchase Coin' address='purchase-coin' />
      <MenuItem icon={MdHomeWork} label='Payment History' address='paymenthistory' />
    
    </>
        </div>
    );
};

export default BuyerHome;