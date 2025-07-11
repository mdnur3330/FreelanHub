import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Login from "../Component/Login";
import SingUp from "../Component/SingUp";
import DashboardLayout from "../Layout/DashboardLayout";
import Hero from "../Page/Hero";
import MyTasks from "../Layout/Dashboard/Buyer/MyTasks";
import AddNewTasks from "../Layout/Dashboard/Buyer/AddNewTasks";
import PurchaseCoin from "../Layout/Dashboard/Buyer/PurchaseCoin";
import AvailableTask from "../Layout/Dashboard/Worker/AvailableTask";
import UpdateTask from "../Layout/Dashboard/Buyer/UpdateTask";
import TaskDetails from "../Layout/Dashboard/TaskDetails";
import TaskToReview from "../Layout/Dashboard/Buyer/TaskToReview";
import MyApprovedTask from "../Layout/Dashboard/Worker/MyApprovedTask";

export const ruter = createBrowserRouter([
    {path:'/',
        element: <Root></Root>,
        children:[
            {index:true,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children:[
            {path: 'dashboard',
                element:<Hero></Hero>
            },
            {
                path: 'add-task',
                element: <AddNewTasks></AddNewTasks>
            },
            {
                path: 'my-task',
                element: <MyTasks></MyTasks>
            },
            {
                path: 'purchase-coin',
                element: <PurchaseCoin></PurchaseCoin>
            },
            {
                path: 'available-task',
                element: <AvailableTask></AvailableTask>
            },
            {
                path: '/dashboard/update-task/:id',
                element: <UpdateTask></UpdateTask>
            },
            {path: '/dashboard/task-details/:id',
                element: <TaskDetails></TaskDetails>
            },
            {path: '/dashboard/task-to-review/',
                element: <TaskToReview></TaskToReview>
            },
            {
                path: 'approved-task',
                element: <MyApprovedTask></MyApprovedTask>
            }
        ]
    },
    {
        path: "/login",
        element:<Login></Login>
    },
    {
        path: "sing-up",
        element: <SingUp></SingUp>
    }
])