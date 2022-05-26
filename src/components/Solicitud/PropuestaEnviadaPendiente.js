import React, { useLayoutEffect, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/status-solicitud_02.png';
import SolicitudBox from '../Generic/SolicitudBox';
import { useHistory } from 'react-router-dom';
import { missingDocs } from '../../utils/missingDocs';
import ValidacionDocumentos from "./ValidacionDocumentos";

const PropuestaEnviada = ({properties}) => {
    const history = useHistory();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [docs, setDocs] = useState(null);
    const [mdocs, setmDocs] = useState([]);

    useLayoutEffect(() => {
        if(user.idClient.appliance[0].hasOwnProperty('idDocuments')){
            setDocs(user.idClient.appliance[0].idDocuments);
        }
    }, []);

    useEffect(() => {
        if(docs != null){
            let missing_docs = missingDocs(user, docs);

            setmDocs(missing_docs);
        }   
    }, [docs]);

    return(
        <>
            {
                mdocs.length == 0 &&
                <ValidacionDocumentos properties={properties}/>
            }

            {
                mdocs.length > 0 &&
                <Row>
                    <Col lg={8} md={8} sm={12}>
                        <div className="title-dp fz42 fw500">
                            Propuesta Enviada
                        </div>
                        <br></br>
                        <div className="title-dp fz20 mb-18 fw500" style={{ marginTop: '-33px' }}>
                            Documentación o Información Pendiente
                        </div>

                        <div className="text-dp mb-18">
                            <strong>¡Felicidades!</strong> Hemos enviado una o más propuestas de crédito a tu
                            correo pero aún nos faltan algunos documentos. Asegúrate de mandarlos para formalizar 
                            tu propuesta.
                        </div>

                        {
                            mdocs.length > 0 && 
                            <SolicitudBox>
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
                            properties.hasOwnProperty('financiera_banco_que_analiza') &&
                            <Button className={"btn-blue-status mt-3 mb-5"} onClick={ () => history.push("/propuestas") }>Ver Propuestas</Button>
                        }
                        
                        {
                            mdocs.length > 0 && 
                            <Button className={"btn-blue-status mt-3 ml-3 mb-5"} onClick={() => history.push(`/documentos/${user._id}`)}>Subir Documentos</Button>
                        }
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <div className='text-center'>
                            <img src={tito} alt="tito" style={{ width: '250px' }}/>
                        </div>
                    </Col>
                </Row>
            }
        </>
    );
}

export default PropuestaEnviada;