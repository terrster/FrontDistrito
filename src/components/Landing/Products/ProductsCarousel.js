import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../../css/products.css';

import web from '../../../assets/img/carousel-products/productos_1.jpg';
import web1 from '../../../assets/img/carousel-products/productos_2.jpg';
import web2 from '../../../assets/img/carousel-products/productos_3.jpg';
import web3 from '../../../assets/img/carousel-products/productos_4.jpg';
import web4 from '../../../assets/img/carousel-products/productos_4.jpg';
import web5 from '../../../assets/img/carousel-products/productos_4.jpg';
import web6 from '../../../assets/img/carousel-products/productos_4.jpg';
import web7 from '../../../assets/img/carousel-products/productos_4.jpg';
import web8 from '../../../assets/img/carousel-products/productos_4.jpg';
import web9 from '../../../assets/img/carousel-products/productos_4.jpg';

 import movil from '../../../assets/img/carousel-products/productsMob1.png';
 import movil1 from '../../../assets/img/carousel-products/productsMob2.png';
 import movil2 from '../../../assets/img/carousel-products/productsMob3.png';
 import movil3 from '../../../assets/img/carousel-products/productsMob4.png';
 import movil4 from '../../../assets/img/carousel-products/productsMob5.png';
 import movil5 from '../../../assets/img/carousel-products/productsMob6.png';
 import movil6 from '../../../assets/img/carousel-products/productsMob7.png';
 import movil7 from '../../../assets/img/carousel-products/productsMob8.png';
 import movil8 from '../../../assets/img/carousel-products/productsMob9.png';
 import movil9 from '../../../assets/img/carousel-products/productsMob10.png';

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
 ];



const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const AlliesCarousel = () => {
    
    const [alliesImages, setAlliesImages] = useState(images);
    const [versionImage, setVersionImage] = useState(getVersionImage());
	const [indexImage, setIndexImage] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndexImage(selectedIndex);
	};

	window.addEventListener('resize', () => setVersionImage(getVersionImage()));

    useEffect(() => {
        if(versionImage === 0){//Web
            let imagesCopy = images.slice(0, 4);
            setAlliesImages(imagesCopy);
        }
        else{//Movil
            let imagesCopy = images.slice(0, 10);//Si quieres 10
            setAlliesImages(imagesCopy);

            // setAlliesImages(images);//Si quieres el resto
        }
    }, [versionImage]);

    return(
        <Carousel className="mb-10 pb-40 pt-40" activeIndex={indexImage} onSelect={handleSelect}>
            {
                alliesImages.map((image, index) => {
                    return  <Carousel.Item>
                                <img className="d-block w-100" src={image[versionImage]} alt={`allie${index}`}/>
                            </Carousel.Item>
                })
            }
        </Carousel>
    );
}

export default AlliesCarousel;