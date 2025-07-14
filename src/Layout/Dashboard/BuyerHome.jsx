import React from 'react';
import MenuItem from './MenuItem';

import { MdAddCircleOutline, MdMonetizationOn, MdPendingActions, MdReceiptLong, MdTaskAlt } from 'react-icons/md';

const BuyerHome = () => {
    return (
        <div>
             <>
               <MenuItem
        icon={MdAddCircleOutline}
        label='Add New Task'
        address='add-task'
      />
      <MenuItem
        icon={MdTaskAlt}
        label='My Tasks'
        address='my-task'
      />
      <MenuItem icon={MdPendingActions} label='Task To Review' address='task-to-review' />
      <MenuItem icon={MdMonetizationOn} label='Purchase Coin' address='purchase-coin' />
      <MenuItem icon={MdReceiptLong} label='Payment History' address='paymenthistory' />
    
    </>
        </div>
    );
};

export default BuyerHome;