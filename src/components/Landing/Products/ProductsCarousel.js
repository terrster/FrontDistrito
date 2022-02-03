import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../../css/products.css';

import web from '../../../assets/img/carousel-products/arrendamiento.png';
import web1 from '../../../assets/img/carousel-products/creditohipotecario.png';
import web2 from '../../../assets/img/carousel-products/creditonomina.png';
import web3 from '../../../assets/img/carousel-products/creditosimple.png';
import web4 from '../../../assets/img/carousel-products/cuentasdigitales.png';
import web5 from '../../../assets/img/carousel-products/factoraje.png';
import web6 from '../../../assets/img/carousel-products/reparaciondeburo.png';
import web7 from '../../../assets/img/carousel-products/revolvente.png';
import web8 from '../../../assets/img/carousel-products/TDCempresarial.png';
import web9 from '../../../assets/img/carousel-products/TPV.png';

import movil from '../../../assets/img/carousel-products/arrendamiento.png';
import movil1 from '../../../assets/img/carousel-products/creditohipotecario.png';
import movil2 from '../../../assets/img/carousel-products/creditonomina.png';
import movil3 from '../../../assets/img/carousel-products/creditosimple.png';
import movil4 from '../../../assets/img/carousel-products/cuentasdigitales.png';
import movil5 from '../../../assets/img/carousel-products/factoraje.png';
import movil6 from '../../../assets/img/carousel-products/reparaciondeburo.png';
import movil7 from '../../../assets/img/carousel-products/revolvente.png';
import movil8 from '../../../assets/img/carousel-products/TDCempresarial.png';
import movil9 from '../../../assets/img/carousel-products/TPV.png';

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
    [web9, movil9]
  
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
        <Carousel className="mt-10" activeIndex={indexImage} onSelect={handleSelect}>
            {
                images.map((image, index) => {
                    return  <Carousel.Item>
                            
                                <img className="d-block images-carousel" src={image[versionImage]} alt={`allie${index}`}/>
                            </Carousel.Item>
                })
            }
        </Carousel>
    );
}

export default AlliesCarousel;