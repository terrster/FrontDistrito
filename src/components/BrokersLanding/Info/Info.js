import React from 'react';
import {Col,Row}  from 'react-bootstrap';
import Title from '../../Generic/Title';

const Info = () => {
 return(
   <div className="container pt-5">
    <Row className="d-flex align-items-center justify-items-center">
      <Col xl={7} lg={7} md={7} className="mb-3">
        <Title title="Brokers Digitales Distrito Pyme" className="title-dp fw500 fz42 title-bd" />
        <div className="metropolisReg fz21 blackBlue text-justify">
					Nuestro programa de Brokers Digitales, te permite adquirir una
          membresía exclusiva de nuestra plataforma y las
          herramientas necesarias que te ayudarán a colocar más crédito,
          todo en menos de 15 minutos.
          <br/>
          <br/>
          Una solicitud a través de Distrito Pyme es como llenar más de 25
          solicitudes de crédito de las mejores instituciones financieras
          para que ahorres tiempo e incrementes tus ingresos.
				</div>
      </Col>

      <Col xl={5} lg={5} md={5}>
         <video className="d-block w-100" loop={true} controls={false} muted={true} autoPlay={true} preload={"true"} playsInline={true} src="https://distrito-pyme-media.s3.us-west-2.amazonaws.com/Brokers_Digitales_Distrito_Pyme.mp4"/>
      </Col>
    </Row>
   </div>
 );
}

export default Info;