import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card } from 'react-bootstrap';
import Icons from '../Icons/Icons';

import '../../../css/HowWorks.css';
import ICONPRUEBA from '../../../assets/img/home/prueba.png';


const HowWorks = props => {
	return(
		<div id="howWorks" className="pt-4 text-center ml-auto mr-auto mb-3">
		<Title title="Requisitos básicos" className="title-dp mt-5 mb-4 fz42" />

		<Title title="Para hacer aún más rápido tu proceso y autorización de crédito, ten a la mano tu RFC con el  que facturas y
      clave CIEC para fines de consulta. Con eso podemos ofrecerte las mejores opciones en menos de 10 minutos.*" className="subtitle-dp fz24 fw300" />
			<Title title="*Opcional" className="subtitle-dp fz18 fw300"/>
		

			<Row className="justify-content-center mt-3">
				<Col xl={3} md={6} sm={6} className="mb-4">
					<Card  style={{ height: '28rem' }}>
						<Icons img={ICONPRUEBA} alt="Firma" width="100px" />
						<Card.Body>
							<Card.Title>Sin alta en el SAT</Card.Title>
							<Card.Text className="metropolisReg fz12 blackBlue text-left">
								<ul>
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

				<Col xl={3} md={6} sm={6} className="mb-4">
					<Card  style={{ height: '28rem' }}>
						<Icons img={ICONPRUEBA} alt="Firma" width="100px" />
						<Card.Body>
							<Card.Title>Personas Físicas con Actividad Empresarial y RIF</Card.Title>
							<Card.Text className="metropolisReg fz12 blackBlue text-left">
								<ul>
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

				<Col xl={3} md={6} sm={6} className="mb-4">
					<Card style={{ height: '28rem' }}>
						<Icons img={ICONPRUEBA} alt="Firma" width="100px" />
						<Card.Body>
							<Card.Title>Persona Moral</Card.Title>
							<Card.Text className="metropolisReg fz12 blackBlue text-left">
								<ul>
									<li>Identificación Oficial principal accionista y representante legal</li>
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