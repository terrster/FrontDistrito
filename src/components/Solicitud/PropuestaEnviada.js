import React, { useLayoutEffect, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-06.png';
import { filterFinancials, dataFinancial } from '../../utils/Financials';
import SolicitudBox from '../Generic/SolicitudBox';

const PropuestaEnviada = ({properties}) => {
    const [proposals, setProposals] = useState(null);

    useLayoutEffect( () => {
        // setProposals(properties.financiera_banco_que_analiza.value.split(';'));
        let _proposals = properties.financiera_banco_que_analiza.value;
        //let _proposals = "ASPIRIA;IMPULSO;ImpulsoMx Aut;CREZE;CUMPLO;BIEN PARA BIEN;Bancoppel;CREDIJUSTO;DOCUFORMAS;PRETMEX;UNICLICK;MUNDI;Factor Expres;MICRO;AV CAPITAL;HayCash";
        let proposalsfilt = filterFinancials(_proposals);
        setProposals(proposalsfilt);
    }, []);

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 mb-18 fw500">
                    Propuesta Enviada
                </div>

                <div className="text-dp mb-8">
                    <strong>¡Felicidades!</strong> Hemos enviado una o más propuestas de crédito a tu
                    correo. En breve, uno de nuestros asesores se comunicará contigo
                    para asegurarnos de contar con toda tu documentación y resolver
                    tus dudas.
                </div>

                <Row style={{padding: '15px'}}>
                    {
                        proposals != null &&
                        proposals.map((proposal, i) => {
                            const financial = dataFinancial(proposal, properties);
               
                            return <SolicitudBox key={i} styleParams={{ marginTop: '15px' }}>
                                {
                                    <div className="text-dp p-1 fz12">
                                        <Row>
                                            <Col xs={8}>
                                                Banco/Financiera: {financial.financiera}<br></br>
                                                Monto Autorizado: { financial.monto < 10000 ? 'Pendiente' : '$' + new Intl.NumberFormat().format(financial.monto)}<br></br>
                                                Plazo: {financial.plazo}<br></br>
                                                Tasa: {financial.tasa}<br></br>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="float-right mr-2">
                                                    <img src={financial.logo} alt={financial.financiera} style={{ width: '100px' }} className={`imgAlianza ${proposal.class}`}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </SolicitudBox>
                        })
                    }
                </Row>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center mt-xs-5'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default PropuestaEnviada;