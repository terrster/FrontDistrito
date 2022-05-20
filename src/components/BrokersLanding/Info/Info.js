import React from 'react';
import {Col,Row, Card}  from 'react-bootstrap';
import Title from '../../Generic/Title';

const Info = () => {
 return(
   <div className="container pt-5">
    <Row className="d-flex align-items-center justify-items-center">
      <Col xl={7} lg={7} md={7} className="mb-3">
      <Card.Header id="header"  className="title-dp-blue fz42 text-left line-height"><span className='title'> broker </span> digital distrito pyme </Card.Header>
        <div className="metropolisReg fz21 blackBlue text-justify">
          <br/>
          si tienes experiencia en el sector pyme y/o hipotecario, 
          el programa de brokers digitales distrito pyme es tu mejor 
          opción para incrementar tus ingresos. 
          <br></br>
          <br/>
          adquiere nuestra membresía azul por un pago único de $3,900 pesos 
          y recibe todas las herramientas necesarias que te ayudarán a colocar
          más créditos, todo en menos de 15 minutos.
          <br></br>
          <br/>
          una sola solicitud como broker digital a través de distrito pyme es 
          como llenar más de 30 solicitudes de crédito de las mejores instituciones 
          financieras ayudándote así, a ahorrar tiempo e incrementes tus ingresos.
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