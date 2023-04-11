import React, { useState, useLayoutEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import isAuthenticated from '../../utils/isAuthenticated'
import logo  from '../../assets/img/logo-dp.png'
import '../../css/nav-bar.css'
import Whatsapp from '../../assets/img/redes_sociales/whatsapp.png';
const NavBar = props => {
	const [isOpen, setIsOpen] = useState(false);
	const [showHome, setShowHome] = useState(false);
	const [showEstatus, setShowEstatus] = useState(false);

	let user = null;
	let idClient = null;
	let finishAppliance = false;
	let appliance = null;

	const partners = [
		'pagaloop',
		'impulsomx',
		'visoor',
		'montanofinanzas',
		'dg-impulsando',
		'se1',
		'eurorep',
		'oficinabajio1',
		'asubia',
		'crediyes',
		'halo',
		'tuempresa',
		'crediexpo',
		'322586238'
];

	useLayoutEffect(() => {
		if (isAuthenticated()){
			user = JSON.parse(sessionStorage.getItem("user"));
			
			if(user.hasOwnProperty("idClient") && user.idClient !== null){
				idClient = user.idClient;

			if (idClient.hasOwnProperty("type")){
				setShowEstatus(true);
			}
			if (idClient.appliance.length > 0){
				appliance = idClient.appliance[idClient.appliance.length - 1];
				finishAppliance = appliance.status;
	
				if(user.idClient.appliance[0].hasOwnProperty("idGeneralInfo") && user.idClient.appliance[0].hasOwnProperty("idComercialInfo") && user.idClient.appliance[0].hasOwnProperty("idDocuments")){
					setShowHome(true);
				}
			}
			}

		}
	})
	
	const history = useHistory();
	const location = useLocation();
	const close = () => setIsOpen(false);
	let classDefault = "hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg";
	let classDefaultLink = "text-center coolvetica fz16 gray50 heigth-45 nav-btn d-flex";
	const [showWhatsAppBtn] = useState(partners.filter(partner => partner == 'impulsomx').includes(location.pathname.toLowerCase().split("/")[2]))
	// const [showWhatsAppBtn] = useState(partners.filter(partner => partner !== 'visoor').includes(location.pathname.toLowerCase().split("/")[2]))
	
	//console.log(location.pathname.split("/")[2].toLowerCase());

	return (
		<div id="navbar-dp" className="pos-f-t">
		 <Navbar collapseOnSelect className="nav-bar" expand="lg" bg="light" expanded={isOpen}>
		 	<Navbar.Brand href = {partners.includes(location.pathname.toLowerCase().split("/")[2]) || location.pathname.split("/").length > 3 || location.pathname === '/brokersCP' ?   "#" : "/"}><img src={logo} alt="Distrito Pyme Logo" className="nav-logo"/></Navbar.Brand>
			 {(location.pathname != '/brokers' && location.pathname !== '/brokersCP' && location.pathname !== "/registro-brokers" && !/^((\/registroexitoso)(\/[a-z]+))/gi.test(location.pathname)) && !partners.includes(location.pathname.toLowerCase().split("/")[2]) &&
				<>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setIsOpen(!isOpen)}/>
					{isAuthenticated() === false &&
						<Navbar.Collapse>
							<Nav className="ml-auto ">
								<Nav.Link onClick={close} as={NavLink} to="/brokers" id="quieroSerBorker" className="text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">quiero ser broker</Nav.Link>
								<Nav.Link onClick={close} as={NavLink} to="/solicitudBrokers" className="text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">soy broker</Nav.Link>
								<Nav.Link onClick={close} as={NavLink} to="/nuestros-aliados" className="text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">aliados</Nav.Link>
								{/* <Nav.Link  onClick={close} href="/#simulador" id="ymb-dp-nav-simulator" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">Simulador</Nav.Link> */}
								{/* <Nav.Link  onClick={close} href="/#howWorks" id="ymb-dp-nav-howWorks" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">¿Cómo funciona?</Nav.Link> */}
								{/* <Nav.Link  onClick={close} href="/#about" id="ymb-dp-nav-about" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">Nosotros</Nav.Link> */}
								<Nav.Link  onClick={close} href="https://distritocasa.com/" id="ymb-dp-nav-howWorks" target="_blank" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">distrito casa</Nav.Link>
								{location.pathname != '/brokers' && location.pathname != '/solicitud_enviada_brokers' && location.pathname != '/alianza' && 
									<>
										<Nav.Link  onClick={close} as={NavLink} to="/login" id="ymb-dp-nav-register" className="text-center fz16 blackNav nav-btn heigth-45 solicita-butto metropolisReg">inicia sesión</Nav.Link>
										<Nav.Link  onClick={close} as={NavLink} to="/registrate" id="ymb-dp-nav-login" className="text-center fz16 nav-btn nav-btn-rad primary heigth-95 w-360 ml-auto mr-auto" style={{textDecoration: "none"}}>comenzar solicitud</Nav.Link>
									</>
								}
							</Nav>
						</Navbar.Collapse>
					}
					{isAuthenticated() === true && 
					<Navbar.Collapse id="basic-navbar-nav">	
						<Nav className="ml-auto">
							{/* {  
								finishAppliance && 
								<Link onClick={close} to={`/credito/solicitud/${appliance._id}`} className={ (props.url === 'credito') ? classDefault+' nav_bar_active': classDefault}>Mi crédito</Link>
							}
							{
								!finishAppliance && 
								<Link onClick={close} to="/credito/" className={ (props.url === 'credito') ? classDefault+' nav_bar_active': classDefault}>Mi crédito</Link>
							} */}
							{
								showEstatus &&
								<Link onClick={close} to="/estatus_solicitud" className={ (props.url === 'estatus_solicitud') ? classDefault+' nav_bar_active': classDefault}>estatus de solicitud</Link>
							}
							{ 
								showHome &&
								<Link onClick={close} to="/micuenta" className={ (props.url === 'micuenta') ? classDefault+' nav_bar_active': classDefault}>mi cuenta</Link>
							}
							<Nav.Link onClick={close} href="/" className="text-center blackBlue heigth-45 metropolisReg"> <Button className="logout fz-12" onClick={() => {
								sessionStorage.clear();
								window.location.reload()
							}}>cerrar sesión</Button></Nav.Link>
						</Nav>
					</Navbar.Collapse>
					}
				</>
			}
			
		 </Navbar>
		 
		 {
				showWhatsAppBtn &&

				<div className="nav-bar-icon-whatsapp" style={{ zIndex: "10001" }}>
							<a href="https://api.whatsapp.com/send?phone=525539480196&text=Hola%2c%20%c2%bfpodr%c3%adan%20ayudarme%3f&source=&data=" target="_blank" rel="noopener noreferrer"><i><img src={Whatsapp} alt="Whatsapp Distrito Pyme" className="nav-bar-icon-whatsapp"/></i></a>
				</div>
			}
		</div>
	)
}

export default NavBar
