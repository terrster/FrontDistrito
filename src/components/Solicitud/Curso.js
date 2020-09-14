import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES TITO-01.png';
import { useHistory } from 'react-router-dom';

const Curso = ({user}) => {
    const history = useHistory();
    const [link, setLink] = useState('/credito/');

    const verifyAppliance = (array) => {
        if (typeof array !== "object") return false;
        return array.length === 0 ? false : array[array.length - 1];
    };
    
    const verify = (object, property) => {
        return object.hasOwnProperty(property);
    };

    useEffect(() => {
        const idClient = user.idClient;
        
        let appliance = verifyAppliance(idClient.appliance);
        let idAmount = verify(appliance, "idAmount");
        let idGeneralInfo = verify(appliance, "idGeneralInfo");
        let idComercialInfo = verify(appliance, "idComercialInfo");
        let idDocuments = verify(appliance, "idDocuments");
        let statusDocuments = { status: false };

        if(idDocuments){
            statusDocuments.status = idDocuments.status;
        }

        if(idAmount == null || !idAmount){
            setLink(`elige-monto/${user._id}`);
        }
        else if(idComercialInfo == null || !idComercialInfo){
            setLink(`datos-comerciales/${user._id}`);
        }
        else if(idGeneralInfo == null || !idGeneralInfo){
            setLink(`informacion-general/${user._id}`);
        } 
        else{
            setLink(`documentos/${user._id}`);
        }
        // else if (!idDocuments || !idDocuments == null || !statusDocuments.status){
        //     setLink(`documentos/${user._id}`);
        // }
    }, []);

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Solicitud en curso
                </div>
                <div className="text-dp mb-18">
                    Aún nos falta información sobre tu negocio. Ayúdanos a completar
                    el 100% de tu solicitud y a subir tus documentos.
                </div>
                <Button className={"btn-blue-status mb-5"} style={{ width: '250px' }} onClick={() => history.push(link)}>Completar solicitud</Button>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito_curso" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default Curso;