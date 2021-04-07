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
    [web10, movil10]
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