import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES TITO-06.png';
import { useHistory } from 'react-router-dom';

const PropuestaEnviada = ({id}) => {
    const history = useHistory();

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Propuesta Enviada
                </div>
                <div className="text-dp mb-18">
                    <strong>¡Felicidades!</strong> Hemos enviado una o más propuestas de crédito a tu
                    correo. En breve, uno de nuestros asesores se comunicará contigo
                    para asegurarnos de contar con toda tu documentación y resolver
                    tus dudas.
                </div>
                <Button className={"btn-blue-status mb-5"} style={{ width: '250px' }}>Ver Propuestas</Button>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito_curso" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default PropuestaEnviada;