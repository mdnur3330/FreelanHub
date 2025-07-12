import React from 'react';
import Navbar from '../Component/Navbar';
import Hero from '../Page/Hero';
import Home from '../Page/Home';

const Root = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Home></Home>
        </div>
    );
};

export default Root;