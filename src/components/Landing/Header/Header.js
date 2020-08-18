import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';

import "../../../css/header.css";
import firstImage from '../../../assets/img/carousel-tmp/WEB.png';
import secondImage from '../../../assets/img/carousel/carrusel-02.jpg';
import firstImageMobie from '../../../assets/img/carousel-tmp/WEB MOVIL-02.jpg';
import secondImageMobie from '../../../assets/img/carousel/mobile-carrusel-02.jpg';
// images[numImage][NormalImage, Mobile Image]
const images = [
	[secondImage, secondImageMobie],
	[firstImage, firstImageMobie],
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

	const goToForm = () => {
		window.location = "https://share.hsforms.com/1NexTiVEwSeSyCS2kvQT-WA2y96v";
	}

	return (
		<div style={{ width: '100%' }}>
			<Carousel
        		activeIndex={indexImage}
				onSelect={handleSelect}
			>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={images[0][versionImage]}
						alt="First slide"
					/>
					<Carousel.Caption>
						<div className="text-center ml-auto mr-auto">
							<div className="vertical-center mr-auto ml-auto container">
								<h3 className="coolvetica fz48 white mb-34 header-title">
                                    ¿Necesitas financiamiento?
								</h3>
								<div
									className="metropolisReg white fz24 lh133"
									style={{ letterSpacing: 0.8 }}
								>
									<p>Recibe las mejores ofertas de crédito</p>
									<p className="metropolisMed ">¡En menos de 24 horas!</p>
								</div>
							</div>
							<Link
								to={
									sessionStorage.getItem('applianceId') !== null
										? '/credito/solicitud/' +
										  sessionStorage.getItem('applianceId')
										: sessionStorage.getItem('token') !== null
										? 'home'
										: '/registrate'
								}
							>
								<div className="coolvetica mt-72 text-center">
									<Button className="header-button fz24 bluePrimary">
                                        Solicitar ahora
									</Button>
								</div>
							</Link>
						</div>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={images[1][versionImage]}
						alt="Second slide"
					/>
					<Carousel.Caption>
						<Button className={versionImage == 0 ? styleWEB : styleWEBM} onClick={() => goToForm()}>
							Regístrate
						</Button>
					</Carousel.Caption>
					{/* <Carousel.Caption>
						<h3 className="coolvetica fz48 white mb-34 header-title">
                            ¿Necesitas financiamiento?
						</h3>
						<div
							className="metropolisReg white fz24 lh133"
							style={{ letterSpacing: '0.8' }}
						>
							<p>Recibe las mejores ofertas de crédito</p>
							<p className="metropolisMed ">¡En menos de 24 horas!</p>
							<Link
								to={
									sessionStorage.getItem('applianceId') !== null
										? '/credito/solicitud/' +
										  sessionStorage.getItem('applianceId')
										: sessionStorage.getItem('token') !== null
										? 'home'
										: '/registrate'
								}
							>
								<div className="coolvetica mt-72 text-center">
									<Button className="header-button fz24 bluePrimary">
                                        Solicitar ahora
									</Button>
								</div>
							</Link>
						</div>
					</Carousel.Caption> */}
				</Carousel.Item>
			</Carousel>
		</div>
	);
};

export default Header;
