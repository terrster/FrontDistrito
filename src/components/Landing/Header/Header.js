import React, { useState, useEffect, version } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';

import "../../../css/header.css";
import '../../../css/general.css';
import firstImage from '../../../assets/img/carousel/homedp_bannerprincipal_sintexto_WEB(1).jpg';
import secondImage from '../../../assets/img/carousel/BROKER.png';
import firstImageMobie from '../../../assets/img/carousel/homedp_bannerprincipal_sintexto_MOBILE.webp';
import secondImageMobie from '../../../assets/img/carousel/BROKERMOVIL.jpg';
import { text } from '@fortawesome/fontawesome-svg-core';
// images[numImage][NormalImage, Mobile Image]
const images = [firstImage, firstImageMobie,];
// const getSize = () => {
// 	let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
// 	let isTablet = window.matchMedia("only screen and (max-width: 1024px)").matches;
// 	let isDesktop = window.matchMedia("only screen and (min-width: 1025px)").matches;

// 	if (isMobile) {
// 		return 1;
// 	} else if (isTablet) {
// 		return 2;
// 	} else if (isDesktop) {
// 		return 0;
// 	}

// };

const getHeight = () => {
	let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
	let isTablet = window.matchMedia("only screen and (max-width: 1024px)").matches;
	let isDesktop = window.matchMedia("only screen and (min-width: 1025px)").matches;

	if (isMobile) {
		return 1;
	} else if (isTablet) {
		return 2;
	} else if (isDesktop) {
		return 0;
	}
}

const Header = props => {
	const [versionImage, setVersionImage] = useState(props.estado);
	const [height, setHeight] = useState(getHeight());
	const [indexImage, setIndexImage] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndexImage(selectedIndex);
	};

	useEffect(() => {
        setVersionImage(props.estado);
		setHeight(getHeight());
    } , [props.estado]);


	const styleWEB = {
		height: '85vh',
		maxHeight: '85vh',
		width: '100vw',
		overflow: 'hidden',
		margin: '0 auto',
		padding: '0',
		border: '0',
	};
	const styleWEBM = {
		height: '60vh',
		maxHeight: '60vh',
		width: '100vw',
		overflow: 'hidden',
		margin: '0 auto',
		padding: '0',
		border: '0',

	}

	const styleWEBT ={
		height: '40vh',
		maxHeight: '40vh',
		width: '100vw',
		overflow: 'hidden',
	}

	const styleMOBILE = {
		position:'absolute' ,
		top:'50%', 
		width:'90%', 
		left:'5%',
		textAlign:'center',
		fontSize:'2rem'
	}
	const styleweb = {
		position:'absolute' ,
		top:'14%', 
		width:'40%', 
		left:'10%'
	}
	
	console.log(height);

	
	// const goToForm = () => {
	// 	window.location = "https://share.hsforms.com/1NexTiVEwSeSyCS2kvQT-WA2y96v";
	// }

	return (
		<>
		<div className="brokers-header position-relative" style={ height === 0? styleWEB : height ===1? styleWEBM : styleWEBT }>
			<div className="container-fluid d-flex flex-column">
				<div>
					<span className="header-title" style={versionImage === 0? styleweb : styleMOBILE}>
						la mejor plataforma para solicitar crédito pyme e hipotecario
					</span>
				</div>
				{
					versionImage === 0 && height === 0?
					<div>
					<span className='header-text' style={{ position:'absolute', top:'53%', left:'10%' }}>
						una solicitud <br/>
						las mejores opciones <br/>
						menos de 15 minutos
					</span>
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
								
									<Button className="header-button fz18 bluePrimary" style={{position:'absolute', bottom:'12%', left:'10%'}}>
                                        comenzar solicitud
									</Button>
								
							</Link>
					</div> : 
					<>
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
										
											<Button className="header-button fz18 bluePrimary" style={{position:'absolute', bottom:'12%', left:'17%'}}>
												comenzar solicitud
											</Button>
										
						</Link>
					</>
				}
			</div>
			<img src={images[versionImage]} alt="brokers" style={{width:'100%', padding:'0'}}/>

		</div>
  		</>
	);
};

export default Header;
