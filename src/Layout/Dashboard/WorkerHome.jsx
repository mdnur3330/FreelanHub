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
        </div>
    );
};

export default WorkerHome;