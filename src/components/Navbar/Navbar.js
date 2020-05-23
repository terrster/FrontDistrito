import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import isAuthenticated from '../../utils/isAuthenticated'
import logo  from '../../assets/img/logo-dp-3-x@2x.png'
import '../../css/nav-bar.css'

const NavBar = props => {
	let classDefault = "brandonMed text-center fz16 gray50 heigth-45 nav-btn ";
	let classDefaultLink = "brandonMed text-center fz16 gray50 heigth-45 nav-btn d-flex";
	return (
		<div className="pos-f-t">
		 <Navbar collapseOnSelect className="nav-bar" expand="lg" bg="light" expanded={props.isOpen}>
		 	<Navbar.Brand href="/"><img src={logo} alt="Distrito Pyme Logo" className="nav-logo"/></Navbar.Brand>
		 		<Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={props.open}/>
		 		{isAuthenticated() === false && 
		 			<Navbar.Collapse>
		 				<Nav className="ml-auto">
		 					<Nav.Link  onClick={props.close} href="/#simulador" id="ymb-dp-nav-simulator" className="brandonMed text-center fz16 blackNav nav-btn heigth-45 solicita-butto">Simulador</Nav.Link>
		 					<Nav.Link  onClick={props.close} href="/#about" id="ymb-dp-nav-about" className="brandonMed text-center fz16 blackNav nav-btn heigth-45 solicita-butto">Nosotros</Nav.Link>
		 					<Nav.Link  onClick={props.close} href="/#howWorks" id="ymb-dp-nav-howWorks" className="brandonMed text-center fz16 blackNav nav-btn heigth-45 solicita-butto">¿Cómo funciona?</Nav.Link>
		 					<Nav.Link  onClick={props.close} href="https://distritopyme.com.mx/" id="ymb-dp-nav-howWorks" target="_blank" className="brandonMed text-center fz16 blackNav nav-btn heigth-45 solicita-butto">Blog</Nav.Link>
		 					<Nav.Link  onClick={props.close} as={NavLink} to="/login" id="ymb-dp-nav-register" className="brandonMed text-center fz16 blackNav nav-btn heigth-45 solicita-butto">Inicia sesión</Nav.Link>
		 					<Nav.Link onClick={props.close} as={NavLink} to="/registrate" id="ymb-dp-nav-login" className="brandonMed text-center fz16 white nav-btn primary heigth-45 w-360 ml-auto mr-auto solicita-button">Solicita tu crédito</Nav.Link>
		 				</Nav>
		 			</Navbar.Collapse>
		 		}
		 		{isAuthenticated() === true && 
		 		<Navbar.Collapse id="basic-navbar-nav">	
		 			<Nav className="ml-auto">
		 				<Link onClick={props.close} to="/credito/solicitud/:idAppliance" className={ (props.url === 'credito') ? classDefault+' nav_bar_active': classDefault}>Mi crédito</Link>
		 				<Link onClick={props.close} to="/historial" className={ (props.url === 'historial') ? classDefault+' nav_bar_active': classDefault}>Historial</Link>
		 				<Nav.Link onClick={props.close} href="/home" className={ (props.url === 'home') ? classDefaultLink+' nav_bar_active': classDefaultLink}>Mi cuenta</Nav.Link>
		 				<Nav.Link onClick={props.close} href="/" className="brandonMed text-center blackBlue heigth-45"> <Button className="logout fz-12" style={{marginTop: '-5px'}} onClick={() => {
							sessionStorage.clear();
		 					window.location.reload()
		 				}}>Cerrar sesión</Button></Nav.Link>
		 			</Nav>
					<div className="nav-bar-icon-whatsapp" style={{ zIndex: "2001" }}>
						<a href="https://api.whatsapp.com/send?phone=525526954055&text=Hola%2c%20%c2%bfpodr%c3%adan%20ayudarme%3f&source=&data=" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
					</div>
		 		</Navbar.Collapse>
		 		}
				
		 </Navbar>
		</div>
	)
}

export default NavBar
