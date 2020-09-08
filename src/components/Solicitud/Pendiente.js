import React from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES TITO-02.png';

const Curso = () => {
    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Documentación Pendiente
                </div>
                <div className="text-dp mb-18">
                    <strong>¡Asegúrate de subir todos tus documentos!</strong><br></br>
                    Si no tienes todos a la mano, podemos empezar con los que tengas.
                </div>
                <div className="estatus-solicitud-box">
                    <div className="p-1 fz12">
                        DOCUMENTOS PENDIENTES
                    </div>
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

export default Curso;