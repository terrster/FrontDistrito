import React from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-07.png';

const ValidacionDocumentos = () => {
    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 fw500">
                    Validación de Documentos
                </div>

                <div className="text-dp mb-18">
                    <strong>¡Nos encontramos revisando tu solicitud!</strong> Estamos trabajando en
                    validar si contamos con tu expediente completo. Pronto recibirás
                    noticias nuestras.
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

export default ValidacionDocumentos;