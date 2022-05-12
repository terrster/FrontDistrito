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
const getSize = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const Header = props => {
	const [versionImage, setVersionImage] = useState(props.estado);
	const [indexImage, setIndexImage] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndexImage(selectedIndex);
	};

	useEffect(() => {
        setVersionImage(props.estado);
    } , [props.estado]);


	const styleWEB = {
		height: '85vh',
		maxHeight: '100vh',
		width: '100vw',
		overflow: 'hidden',
		margin: '0 auto',
		padding: '0',
		border: '0',
	};
	const styleWEBM = {
		height: '60vh',
		maxHeight: '80vh',
		width: '100vw',
		overflow: 'hidden',
		margin: '0 auto',
		padding: '0',
		border: '0',

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


	// const goToForm = () => {
	// 	window.location = "https://share.hsforms.com/1NexTiVEwSeSyCS2kvQT-WA2y96v";
	// }

	return (
		<>
		<div className="brokers-header position-relative" style={ versionImage === 0? styleWEB : styleWEBM }>
			<div className="container-fluid d-flex flex-column">
				<div>
					<span className="header-title" style={versionImage === 0? styleweb : styleMOBILE}>
						la mejor plataforma para solicitar crédito pyme e hipotecario
					</span>
				</div>
				{
					versionImage === 0?
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
