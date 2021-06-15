import React from 'react';
import {Col,Row}  from 'react-bootstrap';
import Title from '../../Generic/Title';

import GENERALIDADES_IMG from '../../../assets/img/brokers-landing/generalidades.png';


const Info = () => {
 return(
   <div className="container pt-5">
    <Row>
      <Col xl={7} lg={7} md={7}>
         <Title title="Brokers Digitales Distrito Pyme" className="subtitle-dp fw300 fz20" />
        <Title title="Generalidades del programa" className="title-dp fw500 fz42" />
        <div className="metropolisReg fz21 blackBlue text-justify">
					Nuestro programa de Brokers Digitales, te permite adquirir una
          membresía exclusiva de nuestra plataforma y las
          herramientas necesarias que te ayudarán a colocar más crédito,
          todo en menos de 15 minutos.
          <br/>
          <br/>
          1 solicitud a través de Distrito Pyme es como llenar más de 20
          solicitudes de crédito de las mejores instituciones financieras
          para que ahorres tiempo e incrementes tus ingresos.
          
				</div>
      </Col>

      <Col xl={5} lg={5} md={5} className="mt-2">
         <img className="w-100" src={GENERALIDADES_IMG} alt="gn" />
      </Col>
    </Row>
   </div>
 );
}

export default Info;