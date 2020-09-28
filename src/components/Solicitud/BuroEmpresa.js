import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES TITO-05.png';
import { useHistory } from 'react-router-dom';

const BuroEmpresa = ({id}) => {
    const history = useHistory();

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Consulta de Buró de la Empresa
                </div>
                <div className="text-dp mb-18">
                    <p>Te hemos enviado el formato de autorización para consultar el Buró de tu empresa 
                    a través de Mifiel. Ahora solo falta firmar el documento con la Fiel de tu empresa o 
                    negocio para continuar con el proceso.</p>

                    <p><Button className={"btn-blue-status"} style={{ width: '400px' }}>Firmar Términos y Condiciones</Button></p>
                    <p><Button className={"btn-blue-status mb-5"} style={{ width: '400px' }}>Firmar Consulta de Buró de tú Empresa</Button></p>
                </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito_curso" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default BuroEmpresa;