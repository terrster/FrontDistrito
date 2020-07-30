import React from 'react';
import { Col } from 'react-bootstrap';
import Title from '../Generic/Title';

const PropCard = props => {
	const numberFormat = new Intl.NumberFormat('es-MX');
	return(
		<Col lg={6} md={6} sm={12} className="p-2 text-center">
			<div style={{maxWidth: '280px'}} className="ml-auto mr-auto propcard">
				<Title className="metropolisReg fz20 ls-11 lh-15 mb-1" title={`Propuesta ${props.number}`} />
				<div className="metropolisReg fz24 mt-1">
					${numberFormat.format(props.pay)} <label className="fz20">/mes</label>
				</div>
				<div className="metropolisReg fz24 mt-1">
					Tasa anual: {props.tasa}
				</div>
			</div>
		</Col>
	)
}

export default PropCard