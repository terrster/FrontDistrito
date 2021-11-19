import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import web from '../../assets/img/alianzas/banners/WEB.jpg';
import web1 from '../../assets/img/alianzas/banners/WEB-01.jpg';
import web2 from '../../assets/img/alianzas/banners/WEB-02.jpg';
import web3 from '../../assets/img/alianzas/banners/WEB-03.jpg';
import web4 from '../../assets/img/alianzas/banners/WEB-04.jpg';
import web5 from '../../assets/img/alianzas/banners/WEB-05.jpg';
import web6 from '../../assets/img/alianzas/banners/WEB-06.jpg';
import web7 from '../../assets/img/alianzas/banners/WEB-07.jpg';
import web8 from '../../assets/img/alianzas/banners/WEB-08.jpg';
import web9 from '../../assets/img/alianzas/banners/WEB-09.jpg';
import web10 from '../../assets/img/alianzas/banners/WEB-10.jpg';
import web11 from '../../assets/img/alianzas/banners/WEB-11.jpg';
import web12 from '../../assets/img/alianzas/banners/WEB-12.jpg';
import web13 from '../../assets/img/alianzas/banners/WEB-13.jpg';
import web14 from '../../assets/img/alianzas/banners/WEB-14.jpg';
import web15 from '../../assets/img/alianzas/banners/WEB-15.jpg';
import web16 from '../../assets/img/alianzas/banners/WEB-16.jpg';
import web17 from '../../assets/img/alianzas/banners/WEB-17.jpg';
import web18 from '../../assets/img/alianzas/banners/WEB-18.jpg';
import web19 from '../../assets/img/alianzas/banners/WEB-19.jpg';
import web20 from '../../assets/img/alianzas/banners/WEB-20.jpg';
import web21 from '../../assets/img/alianzas/banners/WEB-21.jpg';
import web22 from '../../assets/img/alianzas/banners/WEB-22.jpg';


import movil from '../../assets/img/alianzas/banners/movil.jpg';
import movil1 from '../../assets/img/alianzas/banners/movil-01.jpg';
import movil2 from '../../assets/img/alianzas/banners/movil-02.jpg';
import movil3 from '../../assets/img/alianzas/banners/movil-03.jpg';
import movil4 from '../../assets/img/alianzas/banners/movil-04.jpg';
import movil5 from '../../assets/img/alianzas/banners/movil-05.jpg';
import movil6 from '../../assets/img/alianzas/banners/movil-06.jpg';
import movil7 from '../../assets/img/alianzas/banners/movil-07.jpg';
import movil8 from '../../assets/img/alianzas/banners/movil-08.jpg';
import movil9 from '../../assets/img/alianzas/banners/movil-09.jpg';
import movil10 from '../../assets/img/alianzas/banners/movil-10.jpg';
import movil11 from '../../assets/img/alianzas/banners/movil-11.jpg';
import movil12 from '../../assets/img/alianzas/banners/movil-12.jpg';
import movil13 from '../../assets/img/alianzas/banners/movil-13.jpg';
import movil14 from '../../assets/img/alianzas/banners/movil-14.jpg';
import movil15 from '../../assets/img/alianzas/banners/movil-15.jpg';
import movil16 from '../../assets/img/alianzas/banners/movil-16.jpg';
import movil17 from '../../assets/img/alianzas/banners/movil-17.jpg';
import movil18 from '../../assets/img/alianzas/banners/movil-18.jpg';
import movil19 from '../../assets/img/alianzas/banners/movil-19.jpg';
import movil20 from '../../assets/img/alianzas/banners/movil-20.jpg';
import movil21 from '../../assets/img/alianzas/banners/movil-21.jpg';
import movil22 from '../../assets/img/alianzas/banners/movil-22.jpg';

const images = [
	[web, movil],
    [web1, movil1],
    [web2, movil2],
    [web3, movil3],
    [web4, movil4],
    [web5, movil5],
    [web6, movil6],
    [web7, movil7],
    [web8, movil8],
    [web9, movil9],
    [web10, movil10],
    [web11, movil11],
    [web12, movil12],
    [web13, movil13],
    [web14, movil14],
    [web15, movil15],
    [web16, movil16],
    [web17, movil17],
    [web18, movil18],
    [web19, movil19],
    [web20, movil20],
    [web21, movil21],
    [web22, movil22]
];

const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const AlliesCarousel = () => {
    
    const [versionImage, setVersionImage] = useState(getVersionImage());
	const [indexImage, setIndexImage] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndexImage(selectedIndex);
	};

	window.addEventListener('resize', () => setVersionImage(getVersionImage()));

    return(
        <Carousel className="mb-2" activeIndex={indexImage} onSelect={handleSelect}>
            {
                images.map((image, index) => {
                    return  <Carousel.Item>
                                <img className="d-block w-100" src={image[versionImage]} alt={`allie${index}`}/>
                            </Carousel.Item>
                })
            }
        </Carousel>
    );
}

export default AlliesCarousel;