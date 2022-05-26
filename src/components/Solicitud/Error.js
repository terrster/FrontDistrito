import React from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/WhatsApp Image 2022-05-26 at 2.03.08 PM.jpeg';

const Error = () => {
    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Upsss :(
                </div>
                <div className="text-dp mb-18">
                    Algo salió mal tratando de obtener el estatus de solicitud
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

export default Error;