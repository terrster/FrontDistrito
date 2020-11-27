import React from 'react';
import { Row, Col } from 'react-bootstrap';

//Imágenes financieras
import { imgFinancial } from '../../utils/Financials';

const Allies = () => {

    const allies = imgFinancial('ALL');

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