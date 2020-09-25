import React, { useState, useLayoutEffect, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "../../utils/axios";

import ASPIRIA from '../../assets/img/alianzas/aspiria.png';
import IMPULSO from '../../assets/img/alianzas/impulsomx.png';
import CREZE from '../../assets/img/alianzas/creze.png';
import CUMPLO from '../../assets/img/alianzas/cumplo.png';
import BIENPARABIEN from '../../assets/img/alianzas/bien para bien.png';
//BANCOPPEL
//CREDIJUSTO
import DOCUFORMAS from '../../assets/img/alianzas/docuformas.png';
import PRETMEX from '../../assets/img/alianzas/pretmex.png';
import UNICLICK from '../../assets/img/alianzas/uniclick.png';
import MUNDI from '../../assets/img/alianzas/mundi.png';
//FACTOR EXPRES
//MICRO
//AV CAPITAL
//Hay Cash
const Propuestas = () => {
    //const user = JSON.parse(sessionStorage.getItem("user"));
    const user = {
        _id: '5ec8365e67de6c3fd0d807c7',
        hubspotDealId: '2951617913'
    }

    const [properties, setProperties] = useState(null);
    const [proposals, setProposals] = useState(null);

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

        //setTimeout(() => {
            getHubspotProperties();
        //}, 2000);
    }, []);

    useEffect( () => {
        if(properties != null){
            if(properties.hasOwnProperty('financiera_banco_que_analiza')){
                setProposals(properties.financiera_banco_que_analiza.value.split(';'));
            }
        }
    }, [properties]);

    const ShowFinancial = (financial) => {
        switch(financial.replace(" ", "")){
            case 'ASPIRIA':
            return ASPIRIA;

            case 'IMPULSO':
            return IMPULSO;

            case 'CREZE':
            return CREZE;

            case 'CUMPLO':
            return CUMPLO;

            case 'BIENPARABIEN':
            return BIENPARABIEN;

            case 'DOCUFORMAS':
            return DOCUFORMAS;

            case 'PRETMEX':
            return PRETMEX;

            case 'UNICLICK':
            return UNICLICK;

            case 'MUNDI':
            return MUNDI;

        }
    }

    return (
        <div className="container">
            <Row>
                <Col sm={12}>
                    <div className="title-dp fz42 mb-18 fw500">
                        Propuestas
                    </div>
                    <div className="text-dp mb-18">
                        {
                            proposals != null &&
                            proposals.map((proposal, i) => {
                                return <img key={i} src={ShowFinancial(proposal)} alt={proposal} style={{ width: '250px' }}/>
                            })
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Propuestas;