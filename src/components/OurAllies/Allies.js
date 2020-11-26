import React from 'react';
import { Row, Col } from 'react-bootstrap';

//Imágenes financieras
import ASPIRIA from '../../assets/img/alianzas/aspiria.png';
import IMPULSO from '../../assets/img/alianzas/impulso.png';
// import CREZE from '../../assets/img/alianzas/creze.png';
import CUMPLO from '../../assets/img/alianzas/cumplo.png';
import BIENPARABIEN from '../../assets/img/alianzas/bienparabien.png';
// import BANCOPPEL from '../../assets/img/alianzas/bancoppel.png';
import CREDIJUSTO from '../../assets/img/alianzas/credijusto.png';
// import DOCUFORMAS from '../../assets/img/alianzas/docuformas.png';
import PRETMEX from '../../assets/img/alianzas/pretmex.png';
import UNICLICK from '../../assets/img/alianzas/uniclick.png';
import MUNDI from '../../assets/img/alianzas/mundi.png';
import FACTOREXPRES from '../../assets/img/alianzas/factorexpres.png';
// import MICRO from '../../assets/img/alianzas/micro.png';
import AVCAPITAL from '../../assets/img/alianzas/avcapital.png';
import HayCash from '../../assets/img/alianzas/haycash.png';
import Pagaloop from '../../assets/img/alianzas/pagaloop.png';
import iBan from '../../assets/img/alianzas/iBan.png';

const Allies = () => {
    
    const allies = [
        ASPIRIA,
        IMPULSO,
        // CREZE,
        CUMPLO,
        BIENPARABIEN,
        // BANCOPPEL,
        CREDIJUSTO,
        // DOCUFORMAS,
        PRETMEX,
        UNICLICK,
        MUNDI,
        FACTOREXPRES,
        // MICRO, *Es un producto dentro de Impulso
        AVCAPITAL,
        HayCash,
        Pagaloop,
        iBan,
        //Lendera *Aún si alta cómo financiera
    ];

    return(
        <Row>
            {
                allies.map((allie, i) => {
                    return <Col xs={6} md={3} key={i}>
                        <img src={allie} className="imgAlianza"/>
                    </Col>

                })
            }
        </Row>
    );
}

export default Allies;