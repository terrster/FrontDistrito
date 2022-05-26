import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/status-solicitud_02.png';
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
                    <p>Te hemos enviado a tu correo el formato de autorización para consultar el Buró de tu empresa 
                    a través de Mifiel. Ahora solo falta firmar el documento con la Fiel de tu empresa o 
                    negocio para continuar con el proceso.</p>

                    {/* <p><Button className={"btn-blue-status"}>Firmar Términos y Condiciones</Button></p>
                    <p><Button className={"btn-blue-status mb-5"}>Firmar Consulta de Buró de tú Empresa</Button></p> */}

                    <a href="https://web.whatsapp.com/send?phone=5215621109079" target="_blank"><Button className="btn-blue-status mb-5">Contáctanos</Button></a>

                </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default BuroEmpresa;