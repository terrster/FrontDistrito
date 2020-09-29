import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-03.png';
import { useHistory } from 'react-router-dom';

const BuroPendiente = ({id}) => {
    const history = useHistory();

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Consulta de Buró Pendiente
                </div>
                <div className="text-dp mb-18">
                    <p>No pudimos consultar tu Historial Crediticio, es probable que hayas
                    capturado mal alguno de estos datos en tu solicitud:</p>
                    
                    <ul>
                        <li>Crédito Hipotecario</li>
                        <li>Crédito de Auto</li>
                        <li>Últimos 4 dígitos de tu tarjeta de crédito</li>
                    </ul>
  
                    <p>Por favor regresa a tu solicitud y verifica tu información</p>

                    <Button className={"btn-blue-status mb-5"} 
                    onClick={() => 
                    history.push({
                        pathname: `/informacion-general/${id}`,
                        position_ref: 'name2-error'
                    })}>Verificar datos</Button>
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

export default BuroPendiente;