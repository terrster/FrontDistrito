import React, { useLayoutEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-06.png';
import { imgFinancial } from '../../utils/imgFinancials';
import SolicitudBox from '../Generic/SolicitudBox';

const PropuestaEnviada = ({properties}) => {console.log(properties)
    const [proposals, setProposals] = useState(null);

    const dataFinancial = (proposal) => {
        switch(proposal.replace(" ", "")){
            case 'ASPIRIA':
                return {
                    financiera: 'Aspiria',
                    monto: properties.monto_preaut.value,
                    plazo: '12 meses',
                    tasa: '1.2% semanal',
                    logo: imgFinancial(proposal)
                };

            case 'IMPULSO':
            case 'ImpulsoMx Aut':
                let tasa = parseFloat(properties.tasa_preaut.value);
                return {
                    financiera: 'ImpulsoMx',
                    monto: properties.monto_preaut.value,
                    plazo: properties.plazo_preaut.value + ' meses',
                    tasa: tasa.toFixed(2) + '% anual',
                    logo: imgFinancial(proposal)
                };

            case 'CREZE':
                return {
                    financiera: 'Creze',
                    monto: properties.monto_preaut.value,
                    plazo: '',
                    tasa: '',
                    logo: imgFinancial(proposal)
                };

            case 'CUMPLO':
                return {
                    financiera: 'Cumplo',
                    monto: properties.monto_preaut.value,
                    plazo: 'Disposiciones desde 30 y hasta 120 días',
                    tasa: '2.93% mensual sobre el monto utilizado',
                    logo: imgFinancial(proposal)
                };

            case 'BIENPARABIEN':
                return {
                    financiera: 'Bien para Bien',
                    monto: properties.monto_preaut.value,
                    plazo: 'Hasta 60 meses',
                    tasa: '2.25% mensual',
                    logo: imgFinancial(proposal)
                };

            case 'BANCOPPEL':
                return {
                    financiera: 'Bancoppel',
                    monto: properties.monto_preaut.value,
                    plazo: '',
                    tasa: '',
                    logo: imgFinancial(proposal)
                };

            case 'CREDIJUSTO':
                return {
                    financiera: 'Bien para Bien',
                    monto: properties.monto_preaut.value,
                    plazo: 'Hasta 60 meses',
                    tasa: '2.25% mensual',
                    logo: imgFinancial(proposal)
                };

            case 'DOCUFORMAS':
                return {
                    financiera: 'Docuformas',
                    monto: properties.monto_preaut.value,
                    plazo: '',
                    tasa: '',
                    logo: imgFinancial(proposal)
                };

            case 'PRETMEX':
                return {
                    financiera: 'Pretmex',
                    monto: properties.monto_preaut.value,
                    plazo: '12 meses',
                    tasa: '2% mensual',
                    logo: imgFinancial(proposal)
                };

            case 'UNICLICK':
                return {
                    financiera: 'Uniclick',
                    monto: properties.monto_preaut.value,
                    plazo: '12 meses',
                    tasa: '2.9% mensual',
                    logo: imgFinancial(proposal)
                };

            case 'MUNDI':
                return {
                    financiera: 'Mundi',
                    monto: properties.monto_preaut.value,
                    plazo: 'Hasta 120 días por cada disposición',
                    tasa: '1.8% mensual',
                    logo: imgFinancial(proposal)
                };

            case 'FACTOREXPRES':
                return {
                    financiera: 'Factorexpres',
                    monto: properties.monto_preaut.value,
                    plazo: '12 meses',
                    tasa: '2% mensual',
                    logo: imgFinancial(proposal)
                };
            break;

            case 'MICRO':
                return {
                    financiera: 'Micro',
                    monto: properties.monto_preaut.value,
                    plazo: '3 meses',
                    tasa: '5.74% mensual',
                    logo: imgFinancial(proposal)
                };

            case 'AVCAPITAL':
                return {
                    financiera: 'Av Capital',
                    monto: properties.monto_preaut.value,
                    plazo: '',
                    tasa: '',
                    logo: imgFinancial(proposal)
                };

            case 'HayCash':
                return {
                    financiera: 'Hay Cash',
                    monto: properties.monto_preaut.value,
                    plazo: '12 meses',
                    tasa: '2.5% mensual',
                    logo: imgFinancial(proposal)
                };
        }
    }

    useLayoutEffect( () => {
        setProposals(properties.financiera_banco_que_analiza.value.split(';'));
    }, []);

    return(<>
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

                <Row style={{padding: '10px'}}>
                    {
                        proposals != null &&
                        proposals.map((proposal, i) => {
                            const financial = dataFinancial(proposal);
                            // return <Col key={i} lg={3} md={6} xs={6}>
                            //             <div className="text-center">
                            //                 <img src={imgFinancial(proposal)} alt={proposal} className={`imgAlianza ${proposal}`} />
                            //             </div>
                            //         </Col>
                            return <SolicitudBox key={i} styleParams={{ marginTop: '15px' }}>
                                {
                                    <div className="text-dp p-1 fz12">
                                        <Row>
                                            <Col xs={8}>
                                                Banco/Financiera: {financial.financiera}<br></br>
                                                Monto Autorizado: ${new Intl.NumberFormat().format(financial.monto)}<br></br>
                                                Plazo: {financial.plazo}<br></br>
                                                Tasa: {financial.tasa}<br></br>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="float-right mr-2">
                                                    <img src={financial.logo} alt={financial.financiera} style={{ width: '100px' }} className={`imgAlianza ${proposal}`}/>
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

        </>
    );
}

export default PropuestaEnviada;