import React from 'react';
import TestimonialSection from '../Page/Testimonial';
import FeaturesSection from '../Page/FeaturesSection';
import PurchaseCoin from '../Page/CoinPurchase';
import AboutUs from '../Page/AboutUs';
import Statistics from '../Page/Statistics';
import ContactSupport from '../Page/ContactSupport';
import BlogNews from '../Page/BlogNews';
import Banner from '../Page/Banner';
import Home from '../Page/Home';


const Root = () => {
    return (
        <div>
        <Banner></Banner>
        <Home />
         <Statistics />
        <FeaturesSection></FeaturesSection>
        <TestimonialSection></TestimonialSection>
        <AboutUs></AboutUs>
        <ContactSupport></ContactSupport>
        <PurchaseCoin></PurchaseCoin>
        <BlogNews></BlogNews>
        </div>
    );
};

export default Root;