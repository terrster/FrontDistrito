import React, { useState, useLayoutEffect, useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import Axios from "../../utils/axios";
import { filterFinancials, dataFinancial  } from '../../utils/Financials';
import SolicitudBox from '../Generic/SolicitudBox';

const Propuestas = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [properties, setProperties] = useState(null);
    const [proposals, setProposals] = useState(null);
    const [prueba, setPrueba] = useState(null);
    const [error, setError] = useState(false);

    useLayoutEffect( () => {
        const getHubspotProperties = async() => {
            try{
                let {data} = await Axios.get(`/api/deal/${user.hubspotDealId}`);
                setProperties(data.properties);
            } 
            catch(error){
                //console.log(error);
                //showEstatus(null);
            }
        }

        // setTimeout(() => {
            getHubspotProperties();
        // }, 2000);
    }, []);

    useEffect( () => {
        if(properties != null){
            if(properties.hasOwnProperty('financiera_banco_que_analiza')){
                //setProposals(properties.financiera_banco_que_analiza.value.split(';'));
                let _proposals = properties.financiera_banco_que_analiza.value;
                //let _proposals = "ASPIRIA;ImpulsoMx Aut;CREZE;CUMPLO;BIEN PARA BIEN;Bancoppel;CREDIJUSTO;DOCUFORMAS;PRETMEX;UNICLICK;MUNDI;Factor Expres;MICRO;AV CAPITAL;HayCash;PagaLoop;Iban;Pretmex (FastTrack);Dimex";
                let proposalsfilt = filterFinancials(_proposals);
                setProposals(proposalsfilt);
            }
            else{
                setError(true);
            }
        }
    }, [properties]);

    const Financial = ({proposal}) => {

        if(properties === null){
            return null;
        }
        const financial = dataFinancial(proposal, properties);
 
        return <SolicitudBox styleParams={{ marginTop: '15px' }}>
        {
            <div className="text-dp p-1 fz12">
                <Row>
                    <Col xs={8}>
                        Banco/Financiera: {financial.financiera}<br></br>
                        Monto Estimado: { financial.monto < 10000 ? 'Pendiente' : '$' + new Intl.NumberFormat().format(financial.monto).toString().replace('.', ',')}<br></br>
                        Plazo: {financial.plazo}<br></br>
                        Tasa: {financial.tasa}<br></br>
                    </Col>
                    <Col xs={4}>
                        <div className="float-right mr-2">
                            <img src={financial.logo} alt={financial.financiera} style={{ width: '100px' }} className={`imgAlianza ${financial.class}`}/>
                        </div>
                    </Col>
                </Row>
            </div>
        }
    </SolicitudBox>
    }


    return (
        <div className="container">
            <Row>
                <Col sm={12}>
                    <div className="title-dp fz42 fw500">
                        Propuestas
                    </div>
                    <Row style={{padding: '15px'}}>
                        {
                            proposals != null &&
                            proposals.map((proposal, i) => {
                                return <Financial key={i} proposal={proposal} />
                            })
                        }
                        {
                            error &&
                            <Alert variant="danger" style={{width: '100%'}}>
                                Aún no hay propuestas que mostrar :(
                            </Alert>
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Propuestas;