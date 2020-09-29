import React, { useState, useLayoutEffect, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "../../utils/axios";

//Imágenes financieras
import ASPIRIA from '../../assets/img/alianzas/aspiria.png';
import IMPULSO from '../../assets/img/alianzas/impulso.png';
import CREZE from '../../assets/img/alianzas/creze.png';
import CUMPLO from '../../assets/img/alianzas/cumplo.png';
import BIENPARABIEN from '../../assets/img/alianzas/bienparabien.png';
import BANCOPPEL from '../../assets/img/alianzas/bancoppel.png';
import CREDIJUSTO from '../../assets/img/alianzas/credijusto.png';
import DOCUFORMAS from '../../assets/img/alianzas/docuformas.png';
import PRETMEX from '../../assets/img/alianzas/pretmex.png';
import UNICLICK from '../../assets/img/alianzas/uniclick.png';
import MUNDI from '../../assets/img/alianzas/mundi.png';
import FACTOREXPRES from '../../assets/img/alianzas/factorexpres.png';
//import MICRO from '../../assets/img/alianzas/micro.png';
import AVCAPITAL from '../../assets/img/alianzas/avcapital.png';
import HayCash from '../../assets/img/alianzas/haycash.png';

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

            case 'BANCOPPEL':
            return BANCOPPEL;

            case 'CREDIJUSTO':
            return CREDIJUSTO;

            case 'DOCUFORMAS':
            return DOCUFORMAS;

            case 'PRETMEX':
            return PRETMEX;

            case 'UNICLICK':
            return UNICLICK;

            case 'MUNDI':
            return MUNDI;
            
            case 'FACTOREXPRES':
            return FACTOREXPRES;

            case 'MICRO':
            return '';

            case 'AVCAPITAL':
            return AVCAPITAL;

            case 'HayCash':
            return HayCash;
        }
    }

    return (
        <div className="container">
            <Row>
                <Col sm={12}>
                    <div className="title-dp fz42 mb-18 fw500">
                        Propuestas
                    </div>
                    <Row>
                        {
                            proposals != null &&
                            proposals.map((proposal, i) => {
                                return <Col key={i} lg={3} md={6} xs={6}>
                                            <div className="text-center">
                                                <img src={ShowFinancial(proposal)} alt={proposal} className={`imgAlianza ${proposal}`} />
                                            </div>
                                        </Col>
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Propuestas;