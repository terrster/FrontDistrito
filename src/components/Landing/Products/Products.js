import React from 'react';
import Title from '../../Generic/Title';
import Carousel from './ProductsCarousel';
import {Card} from 'react-bootstrap';


const OurAllies = (props) => {
    window.scrollTo(0, 0)
    return(
        <div className="text-center mb-3">
            <Card.Header id="header"  className="title-dp-blue fz48  fw300 text-left" style={{ lineHeight:'2.3rem' }}><span className='title-dp'> nuestros </span> productos </Card.Header>
            <Carousel estado={props}/>
            
        </div>
    );
}

export default OurAllies;