import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-13.png';
// import { useHistory } from 'react-router-dom';

const NoViableSinRequisitos = ({properties}) => {
    // const history = useHistory();

    return(
        
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    No Viable
                </div>

                <div className="text-dp mb-18">
                    Desafortunadamente, no cumples con nuestros requisitos básicos:
                </div>

                <div className="text-dp font-weight-bold mb-18">
                    Ventas mínimas de $20,000 pesos mensuales <br></br>
                    Antigüedad mínima del negocio: 6 meses <br></br>
                    Buen historial de crédito
                </div>

                <div className="text-dp fz12 mb-18">
                    Si crees que es un error por favor comunicate con nosotros para continuar con tu solicitud.
                </div>

                <Button className={"btn-blue-status mb-5"}>Contáctanos</Button>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default NoViableSinRequisitos;