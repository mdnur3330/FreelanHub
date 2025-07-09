import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Login from "../Component/Login";
import SingUp from "../Component/SingUp";

export const ruter = createBrowserRouter([
    {path:'/',
        element: <Root></Root>,
        children:[
            {index:true,
        
            }
        ]
    },
    {
        path: "/login",
        element:<Login></Login>
    },
    {
        path: "sign-up",
        element: <SingUp></SingUp>
    }
])