import React, {  useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import TaskBazaarLoading from '../Component/Loading';


const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <TaskBazaarLoading></TaskBazaarLoading>
    }

    if(!user){
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    if(user){
        return children
    }

};

export default PrivateRoute;