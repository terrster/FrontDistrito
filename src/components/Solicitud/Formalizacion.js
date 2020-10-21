import React, { useLayoutEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import tito from '../../assets/img/estatus_solicitud/POSES_TITO-09.png';
import { imgFinancial } from '../../utils/Financials';
import SolicitudBox from '../Generic/SolicitudBox';

const Formalizacion = ({properties}) => {

    const [autorizationData, setautorizationData] = useState(null);

    useLayoutEffect( () => {
        const data = {
            financiera: properties.otorgante_que_autoriza.value,
            monto: properties.n12_1_monto_autorizado.value,
            plazo: properties.n12_3_plazo_autorizado.value,
            tasa: properties.n12_2_tasa_autorizada.value,
            logo: imgFinancial(properties.otorgante_que_autoriza.value),
            class: properties.otorgante_que_autoriza.value.toUpperCase() == 'IMPULSOMX AUT' ? 'IMPULSO' : properties.otorgante_que_autoriza.value.toUpperCase()
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

                <SolicitudBox>
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
                                        <img src={autorizationData.logo} alt={autorizationData.financiera} className={`imgAlianza ${autorizationData.class}`}/>
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