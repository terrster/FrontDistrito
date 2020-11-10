import React, { useLayoutEffect, useState,useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-06.png';
import SolicitudBox from '../Generic/SolicitudBox';
import { missingDocs } from '../../utils/missingDocs';
import { useHistory } from 'react-router-dom';

const PropuestaEnviadaAdicional = ({properties}) => {
    const history = useHistory();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [docs, setDocs] = useState(null);
    const [mdocs, setmDocs] = useState([]);
    const [aditionalDocs, setaditionalDocs] = useState([]);

    useLayoutEffect(() => {
        setDocs(user.idClient.appliance[0].idDocuments);
    }, []);

    useEffect(() => {
        if(docs != null){
            let missing_docs = missingDocs(user, docs);

            setmDocs(missing_docs);
        }        
    }, [docs]);

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

                {
                    mdocs != null &&
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
                    aditionalDocs != null && 
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
                    <Button className={"btn-blue-status mt-3 mb-5"} onClick={ () => history.push("/propuestas") }>Ver Propuestas</Button>
                }
                
                {
                    mdocs != null &&
                    <Button className={"btn-blue-status mt-3 ml-2 mb-5"} onClick={() => history.push(`/documentos/${user._id}`)}>Subir Documentos</Button>
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

export default PropuestaEnviadaAdicional;