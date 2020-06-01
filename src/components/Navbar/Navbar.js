import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link, NavLink, useHistory } from 'react-router-dom'
import isAuthenticated from '../../utils/isAuthenticated'
import logo  from '../../assets/img/logo-dp-3-x@2x.png'
import '../../css/nav-bar.css'
import Whatsapp from '../../assets/img/redes_sociales/whatsapp.png';
const NavBar = props => {
	const [isOpen, setIsOpen] = useState(false);
	const history = useHistory();
	const close = () => setIsOpen(false);
	let classDefault = "text-center fz16 gray50 heigth-45 nav-btn d-flex hvr-underline-from-left";
	let classDefaultLink = "text-center fz16 gray50 heigth-45 nav-btn d-flex";
	return (
		<div className="pos-f-t">
		 <Navbar collapseOnSelect className="nav-bar" expand="lg" bg="light" expanded={isOpen}>
		 	<Navbar.Brand href="/"><img src={logo} alt="Distrito Pyme Logo" className="nav-logo"/></Navbar.Brand>
		 		<Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setIsOpen(!isOpen)}/>
		 		{isAuthenticated() === false && 
		 			<Navbar.Collapse>
		 				<Nav className="ml-auto ">
		 					<Nav.Link  onClick={close} href="/#simulador" id="ymb-dp-nav-simulator" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto" style={{ fontFamily: "MetropolisRegular"}}>Simulador</Nav.Link>
		 					<Nav.Link  onClick={close} href="/#about" id="ymb-dp-nav-about" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto" style={{ fontFamily: "MetropolisRegular" }}>Nosotros</Nav.Link>
		 					<Nav.Link  onClick={close} href="/#howWorks" id="ymb-dp-nav-howWorks" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto" style={{ fontFamily: "MetropolisRegular" }}>¿Cómo funciona?</Nav.Link>
		 					<Nav.Link  onClick={close} href="https://distritopyme.com.mx/" id="ymb-dp-nav-howWorks" target="_blank" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto" style={{ fontFamily: "MetropolisRegular" }}>Blog</Nav.Link>
		 					<Nav.Link  onClick={close} as={NavLink} to="/login" id="ymb-dp-nav-register" className="hvr-underline-from-left  text-center fz16 blackNav nav-btn heigth-45 solicita-butto" style={{ fontFamily: "MetropolisRegular" }}>Inicia sesión</Nav.Link>
		 					<Nav.Link onClick={close} as={NavLink} to="/registrate" id="ymb-dp-nav-login" className=" text-center fz16 white nav-btn primary heigth-45 w-360 ml-auto mr-auto solicita-button" style={{ fontFamily: "MetropolisRegular" , textDecoration: "none"}}>Solicita tu crédito</Nav.Link>
		 				</Nav>
		 			</Navbar.Collapse>
		 		}
		 		{isAuthenticated() === true && 
		 		<Navbar.Collapse id="basic-navbar-nav">	
		 			<Nav className="ml-auto">
		 				<Link onClick={close} to="/credito/solicitud/:idAppliance" className={ (history.location.pathname === '/credito') ? classDefaultLink +' nav_bar_active': classDefault}>Mi crédito</Link>
		 				<Link onClick={close} to="/historial" className={ (history.location.pathname === '/historial') ? classDefaultLink+' nav_bar_active': classDefault}>Historial</Link>
		 				<Nav.Link onClick={close} href="/home" className={ (history.location.pathname === '/home') ? classDefaultLink+' nav_bar_active': classDefault}>Mi cuenta</Nav.Link>
		 				<Nav.Link onClick={close} href="/" className="hvr-underline-from-left text-center blackBlue heigth-45"> <Button className="logout fz-12" style={{marginTop: '-5px'}} onClick={() => {
							sessionStorage.clear();
		 					window.location.reload()
		 				}}>Cerrar sesión</Button></Nav.Link>
		 			</Nav>
					<div className="nav-bar-icon-whatsapp" style={{ zIndex: "10001" }}>
						<a href="https://api.whatsapp.com/send?phone=525526954055&text=Hola%2c%20%c2%bfpodr%c3%adan%20ayudarme%3f&source=&data=" target="_blank" rel="noopener noreferrer"><i><img src={Whatsapp} alt="Whatsapp Distrito Pyme" className="nav-bar-icon-whatsapp"/></i></a>
					</div>
		 		</Navbar.Collapse>
		 		}
				
		 </Navbar>
		</div>
	)
}

export default NavBar
