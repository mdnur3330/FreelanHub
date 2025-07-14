import React from 'react';
import Navbar from '../Component/Navbar';
import Hero from '../Page/Hero';
import Home from '../Page/Home';
import TestimonialSection from '../Page/Testimonial';
import FeaturesSection from '../Page/FeaturesSection';
import PurchaseCoin from '../Page/PricingSection';
import AboutUs from '../Page/AboutUs';
import Statistics from '../Page/Statistics';
import ContactSupport from '../Page/ContactSupport';
import BlogNews from '../Page/BlogNews';
import Footer from '../Component/Footer';

const Root = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Home></Home>
        <FeaturesSection></FeaturesSection>
        <TestimonialSection></TestimonialSection>
        <PurchaseCoin></PurchaseCoin>
        <AboutUs></AboutUs>
        <Statistics></Statistics>
        <ContactSupport></ContactSupport>
        <BlogNews></BlogNews>
        <Footer></Footer>
        </div>
    );
};

export default Root;