import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-10.png';
// import { useHistory } from 'react-router-dom';

const Depositado = () => {
    // const history = useHistory();

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Depositado
                </div>

                <div className="text-dp mb-18">
                    <strong>¡Gracias por confiar en nosotros!</strong> Ahora que ya tienes tu crédito,
                    estamos seguros que tu empresa o negocio seguirá creciendo.

                    <p className="mt-3">
                        <strong>#ComunidadDeCrédito #TeAyudamosACrecer</strong>
                    </p>
                </div>

                <Button className={"btn-blue-status mt-3 mb-5"}>Estatus del Crédito</Button>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default Depositado;