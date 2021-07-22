import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card } from 'react-bootstrap';

import '../../../css/HowWorks.css';

import HEADERCARD from '../../../assets/img/carousel/carrusel-01.jpg'




const HowWorks = props => {
	return (
		<div id="howWorks" className="pt-4 text-center ml-auto mr-auto mb-3">
			<Title title="Requisitos básicos" className="title-dp fz42 fw300" />

			<Title title="Para hacer aún más rápido tu proceso y autorización de crédito, ten a la mano tu RFC con el que facturas y clave CIEC*
       <br/>*Opcional" className="subtitle-dp fz15 text-center mb-30 " />

			<Row className="justify-content-center mt-3">
				<Col xl={4} md={5} sm={7} xs={11} className="mb-4">
					<Card style={{ height: '28rem' }} id="card-home">
						<Card.Header style={{ height: '8rem' }} id="header-SAT"></Card.Header>
						<Card.Body>
							<Card.Title className="title-cards-dp  white  fz22 text-center">Sin alta en el SAT</Card.Title>
							<Card.Text className="text-dp fz12  white  text-left mt-5">
								<ul className="dp-list-req">
									<li>Identificación Oficial</li>
									<li className="mt-2">Comprobante de domicilio</li>
									<li className="mt-2">Estados de cuenta bancarios</li>
									<li className="mt-2">Mínimo 6 meses con tu negocio</li>
									<li className="mt-2">Ventas mínimas de $15 mil pesos al mes</li>
								</ul>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={4} md={5} sm={7} xs={11} className="mb-4">
					<Card style={{ height: '28rem' }} id="card-home">
						<Card.Header style={{ height: '8rem' }} id="header-SAT"></Card.Header>
						<Card.Body>
							<Card.Title className="title-cards-dp  white fz22 text-center">Personas Físicas con Actividad Empresarial y RIF</Card.Title>
							<Card.Text className="text-dp fz12 fw200  white text-left" style={{marginTop: '25px'}}>
								<ul className="dp-list-req">
									<li className="mt-2">Identificación Oficial</li>
									<li className="mt-2">RFC</li>
									<li className="mt-2">Comprobante de domicilio</li>
									<li className="mt-2">Estados de cuentas bancarios</li>
									<li className="mt-2">Mínimo 12 meses con tu negocio</li>
									<li className="mt-2">Ventas mínimas de $25 mil al mes</li>
								</ul>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={4} md={5} sm={7} xs={11} className="mb-4">
					<Card style={{ height: '28rem' }} id="card-home">
						<Card.Header style={{ height: '8rem' }} id="header-SAT"></Card.Header>
						<Card.Body>
							<Card.Title className="title-cards-dp fz22  white text-center">Persona Moral</Card.Title>
							<Card.Text className="text-dp fz12  white text-left mt-5">
								<ul className="dp-list-req">
									<li className="mt-2">Identificación Oficial principal accionista y rep. legal</li>
									<li className="mt-2">RFC</li>
									<li className="mt-2">Comprobante de domicilio del negocio y personal</li>
									<li className="mt-2">Estados de cuentas bancarios</li>
									<li className="mt-2">Acta constitutiva</li>
									<li className="mt-2">Mínimo 12 meses con tu negocio</li>
									<li className="mt-2">Ventas mínimas de $50 mil al mes</li>
								</ul>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default HowWorks;
