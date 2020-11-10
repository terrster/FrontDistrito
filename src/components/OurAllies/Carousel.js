import React from 'react';
import { Carousel } from 'react-bootstrap';

import web from '../../assets/img/alianzas/banners/WEB.jpg';
import web1 from '../../assets/img/alianzas/banners/WEB-01.jpg';
import web2 from '../../assets/img/alianzas/banners/WEB-02.jpg';
import web4 from '../../assets/img/alianzas/banners/WEB-04.jpg';
// import web6 from '../../assets/img/alianzas/banners/WEB-06.jpg';
import web7 from '../../assets/img/alianzas/banners/WEB-07.jpg';
import web8 from '../../assets/img/alianzas/banners/WEB-08.jpg';

const AlliesCarousel = () => {
    return(
        <Carousel className="mb-2">
            <Carousel.Item>
                <img className="d-block w-100" src={web} alt="web"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={web1} alt="web1"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={web2} alt="web2"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={web4} alt="web4"/>
            </Carousel.Item>
            {/* <Carousel.Item>
                <img className="d-block w-100" src={web6} alt="web6"/>
            </Carousel.Item> */}
            <Carousel.Item>
                <img className="d-block w-100" src={web7} alt="web7"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={web8} alt="web8"/>
            </Carousel.Item>
        </Carousel>
    );
}

export default AlliesCarousel;