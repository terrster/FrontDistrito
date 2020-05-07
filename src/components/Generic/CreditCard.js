import React from 'react';
import Title from './Title';
import { Row, Col } from 'react-bootstrap';
import helper  from '../../models/DateModels'
import { Link } from 'react-router-dom'

const CreditCard = props => {
	return (
<div className="wht-card-box mb-24">
			<Title className="blackBlue coolvetica fw500 mb-16 fz24" title={`Crédito ${new Date(props.date).getDay()} ${helper.months[new Date(props.date).getMonth()].value  } ${new Date(props.date).getFullYear()}`}/>
				<Row className="d-flex justify-content-left text-wrap">
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						Monto
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{ props.amount }
					</Col>
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						Tiempo para pagar
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{ props.term } meses
					</Col>
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						Para qué
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{ props.reason }

					</Col>
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						Cuando lo necesitas
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{ props.whenNeed }
					</Col>
					{ props.expiresDate && 
						<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
							Esta propuesta vence
						</Col>
					}
					{
						props.expiresDate && 
						<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
							{ new Date(props.expiresDate).toLocaleDateString() }
						</Col>
					}
					{
						props.rejected &&
						
							<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
								Razón de rechazo
							</Col>	
					}
					{
						props.rejected &&
						<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
							{ props.rejected}
						</Col>
					}
					{
						props.more && 
						<Col lg={12} md={12} sm={12} className="text-right">
							<Link to={props.more} className="fw500 blackBlue">Ver más</Link>
						</Col> 
					}
				</Row>					
		</div>
	)
}

export default CreditCard