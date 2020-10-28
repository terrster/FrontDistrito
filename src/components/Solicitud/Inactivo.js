import React, { useLayoutEffect, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-12.png';
import SolicitudBox from '../Generic/SolicitudBox';
import { useHistory } from 'react-router-dom';
import { missingDocs } from '../../utils/missingDocs';

const Inactivo = ({properties}) => {

    const history = useHistory();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [docs, setDocs] = useState(null);
    const [mdocs, setmDocs] = useState([]);
    const [aditionalDocs, setaditionalDocs] = useState([]);

    useLayoutEffect(() => {
        setDocs(user.idClient.appliance[0].idDocuments);
    }, []);

    useEffect(() => {
        // if(docs != null){
            let missing_docs = missingDocs(user, docs);

            setmDocs(missing_docs);
        // }  
    }, [docs]);

    useLayoutEffect( () => {
        const infoAdicional = properties.n8_4_info_adicional_requerida.value.replace(/\n|\r/g, ";");
        setaditionalDocs(infoAdicional.split(';'));
    }, []);

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 fw500">
                    Inactivo
                </div>

                <div className="text-dp mb-18">
                    <strong>¡Ups!</strong> Ya pasó tiempo sin saber de ti, por tal motivo tu solicitud fue
                    dada de baja. En caso de seguir interesado por favor comunícate con nosotros.
                </div>

                {
                    mdocs != null || mdocs.length > 0 &&
                    <SolicitudBox classParams="mb-2">
                        <div className="text-dp p-1 fz12">
                            DOCUMENTOS PENDIENTES
                            <br></br>

                            {
                                mdocs != null && 
                                mdocs.map((doc, i) => {
                                    return <span key={i}>{(i+1) +'.- '+ doc} <br></br> </span>
                                })
                            }
                        </div>
                    </SolicitudBox>
                }

                {
                    aditionalDocs != null || aditionalDocs.length > 0 && 
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
                }

                {
                    properties.hasOwnProperty('financiera_banco_que_analiza') &&
                    <Button className={"btn-blue-status mt-3 mb-5"} onClick={() => history.push(`/elige-monto/${user._id}`)}>Reactivar solicitud</Button>
                }
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default Inactivo;