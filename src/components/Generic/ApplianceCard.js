import React from 'react';
import Title from './Title';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cardsElem = {
	generalData : { title: 'Datos generales', first: 'Tipo de persona', second: 'Nombre', third : 'Correo electrónico', fourth : 'Teléfono', five: 'Editar', 'nameSection': 'informacion-general'},
	comercialInfo : { title: 'Datos del negocio', first: 'Nombre comercial', second: 'Giro', third : 'Actividad específica', fourth : 'RFC', five: 'Editar', 'nameSection': 'datos-comerciales' },
	documents : {title: 'Documentos', first: 'Identificación oficial', second: 'Comprobante de domicilio', third : 'Estados de cuenta', fourth : 'Fotos u otros', five: 'Editar', 'nameSection': 'documentos'}
}

const types = {
	PF : { value: "Persona física" },
	PM : { value: "Persona moral"},
	RIF : { value: "Regimén de Incorporación Fiscal" },
	PFAE : { value : "Persona Física con Actividad Empresial"}
}

let defineContent = (data) => {
	return (types[data]) ? `${types[data].value}` : `${data}`
}

const ApplianceCard = props => {
	
	const user = JSON.parse(sessionStorage.getItem("user"));
	const idClient = user.idClient[user.idClient.length - 1];

	return(
		<div className="wht-card-box mb-24">
			<Title className="blackBlue coolvetica fw500 mb-16 fz24" title={cardsElem[props.keyData].title}/>
				<Row className="d-flex justify-content-left text-wrap">
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						{cardsElem[props.keyData].first}
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{ (props.first) ?  defineContent(props.first) : 'No especificado'}
					</Col>
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						{cardsElem[props.keyData].second}
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{(props.second) ? `${props.second}` : 'No especificado'}
					</Col>
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						{cardsElem[props.keyData].third}
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{(props.third) ? `${props.third}` : 'No especificado'}

					</Col>
					<Col lg={6} md={6} sm={12} className="info-label brandonReg text-truncate">
						{cardsElem[props.keyData].fourth}
					</Col>
					<Col lg={6} md={6} sm={12} className="info-request brandonLight text-truncate">
						{(props.fourth) ? `${props.fourth}` : 'No especificado'}
					</Col>
					<Col sm={12} className="info-label brandonReg text-truncate text-right">
							<Link to={idClient.appliance.length > 0 ? `/${cardsElem[props.keyData].nameSection}/${props.applianceId}` : `/elige-monto/${user._id}`} className="h5" style={{color: '#000000', cursor: 'pointer'}}>
								{cardsElem[props.keyData].five}
							</Link>
					</Col>
				</Row>					
		</div>
	)
}

export default ApplianceCard
