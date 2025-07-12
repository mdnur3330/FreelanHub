import React, { useEffect } from 'react';
import axiosSecure from '../../../Hooqs/useAxiosSecure';

const AdminOverview = () => {
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const res = await axiosSecure('/admin-overview')
                console.log(res.data);
            }catch(error){
                console.log(error);
            }
        }
        getData()
    },[])
    return (
        <div>
            
        </div>
    );
};

export default AdminOverview;