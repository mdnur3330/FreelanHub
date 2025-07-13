import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import MenuItem from './MenuItem';

const WorkerHome = () => {
    return (
        <div>
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='Available Task'
                    address='available-task'
                  />
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='My Approved Task'
                    address='approved-task'
                  />
            <MenuItem
                    icon={BsFillHouseAddFill}
                    label='Withdraw Form'
                    address='withDrawal-form'
                  />
        </div>
    );
};

export default WorkerHome;