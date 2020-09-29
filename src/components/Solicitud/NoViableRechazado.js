import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-11.png';
// import { useHistory } from 'react-router-dom';

const NoViableRechazado = () => {
    // const history = useHistory();

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    No Viable
                </div>

                <div className="text-dp mb-18">
                    Desafortunadamente por el momento no contamos con una
                    opción de crédito viable para tu empresa o negocio debido a sus
                    condiciones actuales.
                </div>

                <Button className={"btn-blue-status mt-3 mb-5"}>Contáctanos</Button>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default NoViableRechazado;