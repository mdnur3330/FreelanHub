import React from 'react';
import MenuItem from './MenuItem';
import { MdAccountBalanceWallet, MdCheckCircleOutline, MdChecklist } from 'react-icons/md';
import { ImUpload2 } from "react-icons/im";

const WorkerHome = () => {
    return (
        <div>
            <MenuItem
                    icon={MdChecklist}
                    label='Available Task'
                    address='available-task'
                  />
            <MenuItem
                    icon={MdCheckCircleOutline}
                    label='My Approved Task'
                    address='approved-task'
                  />
            <MenuItem
                    icon={MdAccountBalanceWallet}
                    label='Withdraw Form'
                    address='withDrawal-form'
                  />
            <MenuItem
                    icon={ImUpload2}
                    label='My Submisson'
                    address='my-submisson'
                  />
        </div>
    );
};

export default WorkerHome;