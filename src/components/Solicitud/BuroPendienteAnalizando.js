import React from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/status-solicitud_02.png';

const BuroPendienteAnalizando = () => {
    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Consulta de Buró Pendiente
                </div>
                <div className="text-dp mb-18">
                    Estamos análizando tu Buró de Crédito. En unos minutos tendrás noticias nuestras.
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

export default BuroPendienteAnalizando;