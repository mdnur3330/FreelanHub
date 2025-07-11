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
        </div>
    );
};

export default WorkerHome;