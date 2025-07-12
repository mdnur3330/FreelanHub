import React from 'react';
import { useEffect } from 'react';
import axiosSecure from '../Hooqs/useAxiosSecure';

const Home = () => {
    useEffect(()=>{
        const getTopCoiner = async ()=>{
            try{
                const res = await axiosSecure('/top-workers')
                console.log(res.data);
            }catch(error){
                console.log(error);
            }
        }
        getTopCoiner()
    },[])
    return (
        <div>
            
        </div>
    );
};

export default Home;