import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import web from '../../assets/img/alianzas/banners/WEB.jpg';
import web1 from '../../assets/img/alianzas/banners/WEB-01.jpg';
import web2 from '../../assets/img/alianzas/banners/WEB-02.jpg';
import web4 from '../../assets/img/alianzas/banners/WEB-04.jpg';
import web7 from '../../assets/img/alianzas/banners/WEB-07.jpg';
import web8 from '../../assets/img/alianzas/banners/WEB-08.jpg';

import movil from '../../assets/img/alianzas/banners/movil.jpg';
import movil1 from '../../assets/img/alianzas/banners/movil-01.jpg';
import movil2 from '../../assets/img/alianzas/banners/movil-02.jpg';
import movil4 from '../../assets/img/alianzas/banners/movil-04.jpg';
import movil7 from '../../assets/img/alianzas/banners/movil-07.jpg';
import movil8 from '../../assets/img/alianzas/banners/movil-08.jpg';

const images = [
	[web, movil],
    [web1, movil1],
    [web2, movil2],
    [web4, movil4],
    [web7, movil7],
    [web8, movil8],
];

const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const AlliesCarousel = () => {
    
    const [versionImage, setVersionImage] = useState(getVersionImage());
	const [indexImage, setIndexImage] = useState(0);
	const [currentImage, setCurrentImage] = useState(
		images[indexImage][versionImage]
	);

	const handleSelect = (selectedIndex, e) => {
		setIndexImage(selectedIndex);
	};

	window.addEventListener('resize', () => setVersionImage(getVersionImage()));

	useEffect(() => {
		setCurrentImage(images[indexImage][versionImage]);
	}, [versionImage, indexImage]);

    return(
        <Carousel className="mb-2" activeIndex={indexImage} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block w-100" src={images[0][versionImage]} alt="web"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images[1][versionImage]} alt="web1"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images[2][versionImage]} alt="web2"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images[3][versionImage]} alt="web4"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images[4][versionImage]} alt="web7"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images[5][versionImage]} alt="web8"/>
            </Carousel.Item>
        </Carousel>
    );
}

export default AlliesCarousel;