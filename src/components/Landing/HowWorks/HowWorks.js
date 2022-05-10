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
	[thirdImage, thirdImageMobie],
	[firstImage, firstImageMobie],
	[secondImage, secondImageMobie],
];

const HowWorks = props => {
	const [versionImage, setVersionImage] = useState(0);
	const [indexImage, setIndexImage] = useState(0);
	const [currentImage, setCurrentImage] = useState(
		images[indexImage][versionImage]
	);

	const handleSelect = (selectedIndex, e) => {
		setIndexImage(selectedIndex);
	};

	useEffect(() => {
		setCurrentImage(images[indexImage][versionImage]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [versionImage, indexImage]);

	useEffect(() => {
		setVersionImage(props.estado)
	}, [props.estado]);

	const styleWEB = {
		backgroundColor: '#F6F6F4',
		border: '0'
	};
	const styleWEBM = {
		backgroundColor: '#FFFFFF',
		border: '.1rem solid #E3E3DD'
	};


	return (
		<Card id="howWorks" border='0' className="text-center">
		<Card.Header id="header"  className="title-dp-blue fz56  fw300 text-left line-height"><span className='title-dp'> solo </span> necesitas </Card.Header>
				{
					versionImage === 0 ? (
						<Carousel className=""
						activeIndex={indexImage}
						onSelect={handleSelect}
						controls={false} 
						indicators={versionImage === 0 ? true : false}
						>
						{
							images.map((image, index) => (
								<Carousel.Item key={index}>
									<img className="img-fluid" src={image[versionImage]} alt="Slide" />
									{
										versionImage === 0 && (
											<Carousel.Caption>
										<div className="personas-button-container">
										<Link to={
												sessionStorage.getItem('applianceId') !== null
													? '/credito/solicitud/' +
													  sessionStorage.getItem('applianceId')
													: sessionStorage.getItem('token') !== null
													? 'home'
													: '/registrate'
											}>
											<Button variant="primary" className="personas-button-web fz16 bluePrimary">
											solicítalo ahora
											</Button>
										</Link>
										</div>
									</Carousel.Caption>
										)
									}
								</Carousel.Item>
							))
						}
						</Carousel>
					): (
						images.map((image, index) => (
							<Card className='mb-2' style={index === 1 ? styleWEBM : styleWEB}>
								<Card.Img className="d-block w-100" src={image[versionImage]} alt="Slide" />
								<Card.Body className="text-center">
							<div>
							<Link to={
									sessionStorage.getItem('applianceId') !== null
										? '/credito/solicitud/' +
										  sessionStorage.getItem('applianceId')
										: sessionStorage.getItem('token') !== null
										? 'home'
										: '/registrate'
								}>
								<Button variant="primary" className="personas-button fz16 bluePrimary">
								solicítalo ahora
								</Button>
							</Link>
							</div>
							</Card.Body>
							</Card>
						)
					))
				}
		</Card>
		
	)
}

export default HowWorks;