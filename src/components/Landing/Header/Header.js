import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';

import "../../../css/header.css";
import firstImage from '../../../assets/img/carousel/homedp_bannerprincipal-web.png';
import secondImage from '../../../assets/img/carousel/BROKER.png';
import firstImageMobie from '../../../assets/img/carousel/homedp_bannerprincipal-mobile.png';
import secondImageMobie from '../../../assets/img/carousel/BROKERMOVIL.jpg';
// images[numImage][NormalImage, Mobile Image]
const images = [
	firstImage, firstImageMobie,
];

const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const Header = props => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [versionImage, indexImage]);

	const styleWEB = 'header-button fz24 bluePrimary btn-web';
	const styleWEBM = 'header-button fz24 bluePrimary btn-web-mov';

	// const goToForm = () => {
	// 	window.location = "https://share.hsforms.com/1NexTiVEwSeSyCS2kvQT-WA2y96v";
	// }

	return (
		<div className="brokers-header">
        <img className="d-block w-100" src={images[versionImage]} alt="WEB"/>
        <Button id="headerButton" className="brokers-header-button header-button fz24 bluePrimary">
          solicitala
        </Button>
      </div>
	);
};

export default Header;
