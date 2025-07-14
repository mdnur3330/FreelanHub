import React from 'react';
import Navbar from '../Component/Navbar';
import Hero from '../Page/Hero';
import Home from '../Page/Home';
import TestimonialSection from '../Page/Testimonial';

const Root = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Home></Home>
        <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Root;