import React, { useLayoutEffect, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES TITO-02.png';
import SolicitudBox from '../Generic/SolicitudBox';
import { useHistory } from 'react-router-dom';

const Curso = ({id}) => {
    const history = useHistory();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [docs, setDocs] = useState(null);
    const [mdocs, setmDocs] = useState([]);

    useLayoutEffect(() => {
        setDocs(user.idClient.appliance[0].idDocuments);
    }, []);

    useEffect(() => {
        let missing_docs = [];

        if(docs != null){
            if(user.idClient.type == 'PF'){
                if(docs.oficialID.length == 0){
                    missing_docs.push('Identificación oficial');
                }
                if(docs.proofAddress.length == 0){
                    missing_docs.push('Comprobante de domicilio particular y del negocio');
                }
                if(docs.bankStatements.length == 0){
                    missing_docs.push('Estados de cuenta bancarios');
                }
                if(docs.others.length == 0){
                    missing_docs.push('Otros');
                }
            }

            if(user.idClient.type == 'PFAE'){
                if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                    if(docs.oficialID.length == 0){
                        missing_docs.push('Identificación oficial');
                    }
                    if(docs.proofAddress.length == 0){
                        missing_docs.push('Comprobante de domicilio particular y del negocio');
                    }
                    if(docs.bankStatements.length == 0){
                        missing_docs.push('Estados de cuenta bancarios');
                    }
                    if(docs.others.length == 0){
                        missing_docs.push('Otros');
                    }
                }
                else{
                    if(docs.oficialID.length == 0){
                        missing_docs.push('Identificación oficial');
                    }
                    if(docs.rfc.length == 0){
                        missing_docs.push('RFC');
                    }
                    if(docs.proofAddress.length == 0){
                        missing_docs.push('Comprobante de domicilio particular y del negocio');
                    }
                    if(docs.bankStatements.length == 0){
                        missing_docs.push('Estados de cuenta bancarios');
                    }
                    if(docs.lastDeclarations.length == 0){
                        missing_docs.push('Última declaración de impuestos presentada');
                    }
                    if(docs.acomplishOpinion.length == 0){
                        missing_docs.push('Opinión de cumplimiento');
                    }
                    if(docs.others.length == 0){
                        missing_docs.push('Otros');
                    }
                }
            }

            if(user.idClient.type == 'RIF'){
                if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                    if(docs.oficialID.length == 0){
                        missing_docs.push('Identificación oficial');
                    }
                    if(docs.proofAddress.length == 0){
                        missing_docs.push('Comprobante de domicilio particular y del negocio');
                    }
                    if(docs.bankStatements.length == 0){
                        missing_docs.push('Estados de cuenta bancarios');
                    }
                    if(docs.others.length == 0){
                        missing_docs.push('Otros');
                    }
                }
                else{
                    if(docs.oficialID.length == 0){
                        missing_docs.push('Identificación oficial');
                    }
                    if(docs.rfc.length == 0){
                        missing_docs.push('RFC');
                    }
                    if(docs.proofAddress.length == 0){
                        missing_docs.push('Comprobante de domicilio particular y del negocio');
                    }
                    if(docs.bankStatements.length == 0){
                        missing_docs.push('Estados de cuenta bancarios');
                    }
                    if(docs.lastDeclarations.length == 0){
                        missing_docs.push('Última declaración de impuestos presentada');
                    }
                    if(docs.acomplishOpinion.length == 0){
                        missing_docs.push('Opinión de cumplimiento');
                    }
                    if(docs.others.length == 0){
                        missing_docs.push('Otros');
                    }
                }
            }

            if(user.idClient.type == 'PM'){
                if(user.idClient.appliance[0].idComercialInfo.ciec != null){
                    if(docs.constitutiveAct.length == 0){
                        missing_docs.push('Acta constitutiva, asamblea y poderes');
                    }
                    if(docs.financialStatements.length == 0){
                        missing_docs.push('Estados financieros');
                    }
                    if(docs.bankStatements.length == 0){
                        missing_docs.push('Estados de cuenta bancarios');
                    }
                    if(docs.oficialID.length == 0){
                        missing_docs.push('Identificación de representante legal y principales accionistas');
                    }
                    if(docs.proofAddressMainFounders.length == 0){
                        missing_docs.push('Comprobante de domicilio del negocio y particular del representante legal y principales accionistas');
                    }
                    if(docs.others.length == 0){
                        missing_docs.push('Fotos de tu empresa o negocio u otros');
                    }
                }
                else{
                    if(docs.constitutiveAct.length == 0){
                        missing_docs.push('Acta constitutiva, asamblea y poderes');
                    }
                    if(docs.rfc.length == 0){
                        missing_docs.push('RFC');
                    }
                    if(docs.financialStatements.length == 0){
                        missing_docs.push('Estados financieros');
                    }
                    if(docs.bankStatements.length == 0){
                        missing_docs.push('Estados de cuenta bancarios');
                    }
                    if(docs.lastDeclarations.length == 0){
                        missing_docs.push('Declaraciones anuales de los dos últimos años');
                    }
                    if(docs.oficialID.length == 0){
                        missing_docs.push('Identificación de representante legal y principales accionistas');
                    }
                    if(docs.proofAddressMainFounders.length == 0){
                        missing_docs.push('Comprobante de domicilio del negocio y particular del representante legal y principales accionistas');
                    }
                    if(docs.others.length == 0){
                        missing_docs.push('Fotos de tu empresa o negocio u otros');
                    }
                }
            }
        }

        setmDocs(missing_docs);
    }, [docs]);
    
    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Documentación Pendiente
                </div>
                <div className="text-dp mb-18">
                    <p><strong>¡Asegúrate de subir todos tus documentos!</strong></p>
                    Si no tienes todos a la mano, podemos empezar con los que tengas.
                </div>
                
                <SolicitudBox docs={mdocs}/>

                <Button className={"btn-blue-status mt-3 mb-5"} style={{ width: '250px' }} onClick={() => history.push(`/documentos/${id}`)}>Completar solicitud</Button>
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