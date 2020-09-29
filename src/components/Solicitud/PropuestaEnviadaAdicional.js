import React, { useLayoutEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-06.png';
import SolicitudBox from '../Generic/SolicitudBox';
import { useHistory } from 'react-router-dom';

const PropuestaEnviadaAdicional = ({properties}) => {
    const history = useHistory();

    const [aditionalDocs, setaditionalDocs] = useState(null);

    useLayoutEffect( () => {
        const infoAdicional = properties.n8_4_info_adicional_requerida.value.replace(/\n|\r/g, ";");
        setaditionalDocs(infoAdicional.split(';'));
    }, []);

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 fw500">
                    Propuesta Enviada
                </div>
                <br></br>
                <div className="title-dp fz20 mb-18 fw500" style={{ marginTop: '-33px' }}>
                    Información Adicional
                </div>

                <div className="text-dp mb-18">
                    Tu solicitud está siendo revisada por nuestra área de ánalisis, sin
                    embargo surgieron algunas dudas. Es probable que necesitemos
                    algo más de infomación de tu parte.
                </div>

                <SolicitudBox>
                    <div className="text-dp p-1 fz12">
                        DOCUMENTOS ADICIONALES
                        <br></br>

                        {
                            aditionalDocs != null && 
                            aditionalDocs.map((doc, i) => {
                                return <span key={i}>{(i+1) +'.- '+ doc} <br></br> </span>
                            })
                        }
                    </div>
                </SolicitudBox>

                <Button className={"btn-blue-status mt-3 mb-5"} onClick={ () => history.push("/propuestas") }>Ver Propuestas</Button>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default PropuestaEnviadaAdicional;