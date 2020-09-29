import React, { useLayoutEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-08.png';

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

const AnalisisCredito = ({properties}) => {
    const [proposals, setProposals] = useState(null);

    useLayoutEffect( () => {
        setProposals(properties.financiera_banco_que_analiza.value.split(';'));
    }, []);

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
                                            <img src={ShowFinancial(proposal)} alt={proposal} className={`imgAlianza ${proposal}`} />
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