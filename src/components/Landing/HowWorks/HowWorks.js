import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col} from 'react-bootstrap';
import Icons from '../Icons/Icons';

import REQUISITOS_BÁSICOS_01 from '../../../assets/img/REQUISITOS_BÁSICOS_01.png';
import REQUISITOS_BÁSICOS_02 from '../../../assets/img/REQUISITOS_BÁSICOS_02.png';
import REQUISITOS_BÁSICOS_03 from '../../../assets/img/REQUISITOS_BÁSICOS_03.png';

const HowWorks = props => {
	return(
		<div id="howWorks" className="pt-4 text-center ml-auto mr-auto">
			<Title title="Requisitos básicos" className="coolvetica blackBlue fw500 mb-1 fz42" />
			<Title title="Fácil, rápido y sin papeleos" className="metropolisReg fz32 blackBlue fw300 ls-01" />
				<Row className="justify-content-center mt-3">
					<Col lg={3}>
						<Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" text="Ingresos mínimos de $20,000 pesos mensuales (comprobables)" />
					</Col>
					<Col lg={3}>
						<Icons img={REQUISITOS_BÁSICOS_02} alt="Documentos" width="100px" text="Antigüedad del negocio mínima de 6 meses" />
					</Col>
					<Col lg={3} className="pt-2">
						<Icons img={REQUISITOS_BÁSICOS_03} alt="Ofertas" width="100px" text="Buen buró (en caso de no contar con buen buró se puede analizar la opción de una garantía)"/>
					</Col>
				</Row>
		</div>
	)
}

export default HowWorks;