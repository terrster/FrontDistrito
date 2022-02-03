import React from 'react';
import Title from '../../Generic/Title';
import Carousel from './ProductsCarousel';


const OurAllies = () => {
    window.scrollTo(0, 0)
    return(
        <div className="text-center pb-120">
            <Title title="nuestros productos" className="title-dp fz42 fw500 mb-1"/>
            <Carousel/>
            
        </div>
    );
}

export default OurAllies;