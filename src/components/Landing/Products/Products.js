import React from 'react';
import Title from '../../Generic/Title';
import Carousel from './ProductsCarousel';
import {Card} from 'react-bootstrap';


const OurAllies = () => {
    window.scrollTo(0, 0)
    return(
        <div className="text-center pb-120">
            <Card.Header id="header"  className="title-dp-blue fz48  fw300 text-left line-height"><span className='title-dp'> nuestros </span> productos </Card.Header>
            <Carousel/>
            
        </div>
    );
}

export default OurAllies;