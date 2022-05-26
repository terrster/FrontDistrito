import React, { useLayoutEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/status-solicitud_01.png';
import { filterFinancials, imgFinancial } from '../../utils/Financials';

const AnalisisCredito = ({properties}) => {
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
                <div className="title-dp fz42 fw500">
                    En Análisis de Crédito
                </div>

                <div className="text-dp mb-18">
                    <strong>¡Genial!</strong> Tu solicitud está siendo analizada por los siguientes
                    Bancos y/o Financieras, en breve un asesor se pondrá en contacto contigo.
                </div>

                <Row>
                    {
                        proposals != null &&
                        proposals.map((proposal, i) => {
                            return <Col key={i} lg={3} md={6} xs={6}>
                                        <div className="text-center">
                                            <img src={imgFinancial(proposal)} alt={proposal} className={`imgAlianza`}/>
                                        </div>
                                    </Col>
                        })
                    }
                </Row>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default AnalisisCredito;