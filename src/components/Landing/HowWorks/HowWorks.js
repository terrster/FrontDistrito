import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card } from 'react-bootstrap';
import Icons from '../Icons/Icons';

import '../../../css/HowWorks.css';

// import REQUISITOS_BÁSICOS_01 from '../../../assets/img/REQUISITOS BÁSICOS-01.png';
// import REQUISITOS_BÁSICOS_02 from '../../../assets/img/REQUISITOS BÁSICOS-02.png';
// import REQUISITOS_BÁSICOS_03 from '../../../assets/img/REQUISITOS BÁSICOS-03.png';

const HowWorks = props => {
	return(
		<div id="howWorks" className="pt-4 text-center ml-auto mr-auto">
			<Title title="Hoy en día existe una infinidad de créditos para tu empresa o negocio pero solo una plataforma
			que aloja todas esas opciones en una sola solicitud en menos de 15 minutos" className="subtitle-dp fz29 fw300 ls-01" />
			<Title title="Requisitos básicos" className="title-dp fw500 mt-5 mb-1 fz42" />
				<Row className="justify-content-center mt-3">

				<Col xl={3} md={5} sm={7} className="mb-4">
					<Card id="card-home" style={{ height: '20rem' }} className="tarjet-info-home">
						<Card.Body>
							<Card.Text className="metropolisReg fz22 blackBlue text-center">
							  Sin alta en el SAT
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={3} md={5} sm={7} className="mb-4">
					<Card id="card-home" style={{ height: '20rem' }} className="tarjet-info-home">
						<Card.Body>
							<Card.Text className="metropolisReg fz22 blackBlue text-center">
								Personas Físicas con Actividad Empresarial
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={3} md={5} sm={7} className="mb-4">
					<Card id="card-home" style={{ height: '20rem' }} className="tarjet-info-home">
						<Card.Body>
							<Card.Text className="metropolisReg fz22 blackBlue text-center">
								Persona Moral
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>




					{/* <Col lg={3}>
						<Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" text="Ingresos mínimos de $20,000 pesos mensuales (comprobables)" />
					</Col>
					<Col lg={3}>
						<Icons img={REQUISITOS_BÁSICOS_02} alt="Documentos" width="100px" text="Antigüedad del negocio mínima de 6 meses" />
					</Col>
					<Col lg={3} className="pt-2">
						<Icons img={REQUISITOS_BÁSICOS_03} alt="Ofertas" width="100px" text="Buen buró (en caso de no contar con buen buró se puede analizar la opción de una garantía)"/>
					</Col> */}
				</Row>
		</div>
	)
}

export default HowWorks;