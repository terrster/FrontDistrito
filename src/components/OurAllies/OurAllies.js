import React from 'react';
import Title from '../Generic/Title';
import Carousel from './Carousel';
import Allies from './Allies';

const OurAllies = () => {
    window.scrollTo(0, 0)
    return(
        <div className="text-center">
            <Title title="Nuestros Aliados" className="title-dp fz42 fw500 mb-1"/>
            <Carousel/>
            <div className="container-fluid mb-2">
                <Allies/> 
            </div>
        </div>
    );
}

export default OurAllies;