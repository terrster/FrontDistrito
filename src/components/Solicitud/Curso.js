import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES TITO-01.png';
import { useHistory } from 'react-router-dom';

const Curso = () => {
    const history = useHistory();

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Solicitud en curso
                </div>
                <div className="text-dp mb-18">
                    Aún nos falta información sobre tu negocio. Ayúdanos a completar
                    el 100% de tu solicitud y a subir tus documentos.
                </div>
                <Button className={"btn-blue-status mb-5"} style={{ width: '250px' }} onClick={() => history.push(`/credito/`)}>Ver solicitud</Button>
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