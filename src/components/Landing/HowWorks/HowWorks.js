import React, { useState, useEffect } from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card } from 'react-bootstrap';


import { Link, NavLink } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';


import '../../../css/HowWorks.css';
import firstImage from '../../../assets/img/carousel-howWorks/rif-web.png';
import secondImage from '../../../assets/img/carousel-howWorks/fisica-web.png';
import thirdImage from '../../../assets/img/carousel-howWorks/moral-web.png';
import firstImageMobie from '../../../assets/img/carousel-howWorks/rif-mob.png';
import secondImageMobie from '../../../assets/img/carousel-howWorks/fisica-mob.png';
import thirdImageMobie from '../../../assets/img/carousel-howWorks/moral-mob.png';
// images[numImage][NormalImage, Mobile Image]

const images = [
	[firstImage, firstImageMobie],
	[secondImage, secondImageMobie],
	[thirdImage, thirdImageMobie],
];

const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const HowWorks = props => {
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


	return (
		<div id="howWorks" style={{ width: '100%' }}>
			<Card.Header id="header"  className="title-dp-blue fz56  fw300 text-left line-height"><span className='title-dp'> solo </span> necesitas </Card.Header>
			<Carousel className="pb-70 plr-60"
        		activeIndex={indexImage}
				onSelect={handleSelect}
				controls={true} 
				indicators={true}
			>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={images[0][versionImage]}
						alt="First slide"
					/>
					<Carousel.Caption>
						<div className="container">
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
								<div className="metropolisReg mt-420 mr-20">
									<Button className="personas-button fz20 bluePrimary">
									solicítalo ahora
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
						<div className="container">
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
								<div className="metropolisReg mt-420 mr-20">
									<Button className="personas-button fz20 bluePrimary">
									solicítalo ahora
									</Button>
								</div>
							</Link>
						</div>
					</Carousel.Caption>
				</Carousel.Item>


				   
			<Carousel.Item>
					<img
						className="d-block w-100"
						src={images[2][versionImage]}
						alt="Third slide"
					/>
					<Carousel.Caption>
						<div className="container">
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
								<div className="metropolisReg mt-420 mr-20">
									<Button className="personas-button fz20 bluePrimary">
									solicítalo ahora
									</Button>
								</div>
							</Link>
						</div>
					</Carousel.Caption>
				</Carousel.Item>


			</Carousel>
		</div>
		
	)
}

export default HowWorks;
