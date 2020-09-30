import React, { useLayoutEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-09.png';
import SolicitudBox from '../Generic/SolicitudBox';

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

const Formalizacion = ({properties}) => {

    const [autorizationData, setautorizationData] = useState(null);

    const ShowFinancial = (financial) => {
        switch(financial.replace(" ", "")){
            case 'ASPIRIA':
            return ASPIRIA;

            case 'IMPULSO':
            case 'ImpulsoMxAut':
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

    useLayoutEffect( () => {
        const data = {
            financiera: properties.otorgante_que_autoriza.value,
            monto: properties.n12_1_monto_autorizado.value,
            plazo: properties.n12_3_plazo_autorizado.value,
            tasa: properties.n12_2_tasa_autorizada.value,
            logo: ShowFinancial(properties.otorgante_que_autoriza.value)
        };

        setautorizationData(data);

    }, []);

    return(
        <Row>
            <Col lg={8} md={8} sm={12}>
                <div className="title-dp fz42 fw500">
                    Autorizado / Formalización
                </div>

                <div className="text-dp mb-18">
                    <strong>¡Muchas Felicidades!</strong> Tu Crédito ha sido autorizado, solo hace falta
                    firmar contrato. Muy pronto tu crédito será depositado.
                </div>

                <SolicitudBox styleParams={{ width: '80%' }}>
                    {
                        autorizationData != null &&

                        <div className="text-dp p-1 fz12">
                            <Row>
                                <Col xs={8}>
                                    Banco/Financiera: {autorizationData.financiera}<br></br>
                                    Monto Autorizado: ${new Intl.NumberFormat().format(autorizationData.monto)}<br></br>
                                    Plazo: {autorizationData.plazo.toLowerCase()}<br></br>
                                    Tasa: {autorizationData.tasa + "% anual"}<br></br>
                                </Col>
                                <Col xs={4}>
                                    <div className="float-right mr-2">
                                        <img src={autorizationData.logo} alt={autorizationData.financiera} style={{ width: '100px'}}/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    }
                </SolicitudBox>
            </Col>
            <Col lg={4} md={4} sm={12}>
                <div className='text-center'>
                    <img src={tito} alt="tito" style={{ width: '250px' }}/>
                </div>
            </Col>
        </Row>
    );
}

export default Formalizacion;