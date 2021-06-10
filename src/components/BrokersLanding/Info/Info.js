import React from 'react';
import {Col,Row}  from 'react-bootstrap';
import Title from '../../Generic/Title';

const Info = () => {
 return(
   <div className="container pt-5">
    <Row>
      <Col>
        <Title title="Generalidades del programa" className="title-dp fw500 mb-1 fz42" />
        <div className="metropolisReg fz21 blackBlue">
					Nuestro programa de Brokers Digitales, te permite adquirir una <br/>
          membresía exclusiva de nuestra plataforma y las<br/>
          herramientas necesarias que te ayudarán a colocar más crédito,<br/>
          todo en menos de 15 minutos.
          <br/>
          <br/>
          1 solicitud a través de Distrito Pyme es como llenar más de 20<br/>
          solicitudes de crédito de las mejores instituciones financieras<br/>
          para que ahorres tiempo e incrementes tus ingresos.
          
				</div>
      </Col>

      <Col>
      imagen
      </Col>
    </Row>
   </div>
 );
}

export default Info;