import React from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-06-02.png';

const PropuestaEnviada = ({user}) => {

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Pre - Análisis
                </div>

                <div className="text-dp mb-8">
                    <p>Estamos revisando el perfil de tu negocio para asignarlo a alguno de nuestros banco/financieras aliados a los que puedes calificar.</p>
                    
                    <p>En unos minutos, comenzarás a recibir las mejores propuestas de crédito en tu correo: <strong>{user.email}</strong></p>
                </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center mt-xs-5'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default PropuestaEnviada;