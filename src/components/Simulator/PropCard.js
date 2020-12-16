import React, { useState } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';
import Title from '../Generic/Title';
import helpImg from '../../assets/img/type_person/help.png';

function PropCardModal(props) {
	return (
	  <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
		<Modal.Header closeButton>
		  <Modal.Title id="contained-modal-title-vcenter text-center">
		  	PERFIL DEL NEGOCIO REQUERIDO
		  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
		  <ul className="text-dp mt-4 mb-5">
			{props.descriptions.map((text, index) => {
				return <li key={index}>{text}</li>
			})}
		  </ul>
		  <div style={{ display: 'flex', justifyContent: 'center' }}>
		  	<Button onClick={props.onHide} className="btn-blue-general" style={{width: '250px'}}>Cerrar</Button>
		  </div>
		</Modal.Body>
	  </Modal>
	);
  }

const PropCard = props => {
	const [modalShow, setModalShow] = useState(false);
	let descriptions = {
		1: [
			"Ser Persona Moral.",
			"Antigüedad del negocio de 3 años o más.",
			"Ventas mínimas de $3 millones de pesos al año.",
			"Contar con una garantía inmobiliaria."
		],
		2: [
			"Ser Persona Moral o Persona Física con Actividad Empresarial.",
			"Antigüedad del negocio de 2 años o más.",
			"Ventas mínimas de $1 millones de pesos al año.",
			"Preferentemente contar con una garantía inmobiliaria, activo fijo u otro."
		],
		3: [
			"Ser Persona Moral,  Persona Física con Actividad Empresarial o RIF (Régimen de Incorporación Fiscal.",
			"Antigüedad del negocio de 1 años o más.",
			"Ventas mínimas de $300,000 pesos al año.",
			"Comprobar ingresos con 6 meses de Estados de Cuenta Bancarios."			
		],
		4: [
			"Contar con un negocio operando (comprobable), no es necesario estar dado de alta en el SAT.",
			"Antigüedad del negocio de 6 meses mínimo operando.",
			"Ventas mínimas de $300,000 pesos al año.",
			"Comprobar ingresos con 6 meses de Estados de Cuenta Bancarios."
		]
	}
	const numberFormat = new Intl.NumberFormat('es-MX');
	return(
		<Col lg={6} md={6} sm={12} className="p-2 text-center">
			<div style={{maxWidth: '280px'}} className="ml-auto mr-auto propcard">
				<Title className="metropolisReg fz20 ls-11 lh-15 mb-1" title={`Propuesta ${props.number}`} />
				<div className="metropolisReg fz24 mt-1">
					${numberFormat.format(props.pay)} <label className="fz20">/mes</label>
					<img src={helpImg} className="helpImg" alt="Info Propuesta" width="20px" heigth="30px" onClick={() => setModalShow(true)}/>
				</div>
				<div className="metropolisReg fz24 mt-1">
					Tasa anual: {props.tasa}
				</div>
			</div>
			<PropCardModal descriptions={descriptions[props.number]} show={modalShow} onHide={() => setModalShow(false)}/>
		</Col>
	)
}

export default PropCard