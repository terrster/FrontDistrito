import React from 'react';
import Title from '../../Generic/Title';
import { Card, Row, Col } from 'react-bootstrap';
import Icons from '../../Landing/Icons/Icons';

import REGISTRATE from '../../../assets/img/brokers-landing/iconos/registrate.png';
import FIRMA from '../../../assets/img/brokers-landing/iconos/firma.png';
import MEMBRESIA from '../../../assets/img/brokers-landing/iconos/membresia.png';
import HERRAMIENTAS from '../../../assets/img/brokers-landing/iconos/recibe_herramientas.png';
import GANAR_DINERO from '../../../assets/img/brokers-landing/iconos/gana_dinero.png';

const Cards = () => {

  return(
    <div id="cardsBrokers" className="pt-5 text-center">
      <Title title="¿Cómo convertirme en Broker Digital?" className="title-dp fw500 mb-1 fz42"/>
    <div className="justify-content-center container container-xl pt-4">
      <Row className="justify-content-center">
          <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
              <Icons img={REGISTRATE} alt="registrate" width="100px" />
            <Card.Body>
              <Card.Title>Regístrate</Card.Title>
              <Card.Text >
                <div className="metropolisReg fz12 blackBlue text-center">
                Completa tu registro y uno de nuestros asesores
                se pondrá en contacto contigo para ofrecerte mayor información.
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
              <Icons img={FIRMA} alt="Firma" width="100px" />
            <Card.Body>
              <Card.Title>Firma tu contrato</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-center">
                Nuestro proceso de firma es 100% Digital.

                Necesitarás: <br />
                • INE <br />
                • Comprobante de domicilio <br />
                • Constancia de Situación Fiscal <br />
                • Estado de cuenta bancario <br />
                • Acta Constitutiva (en caso de ser personal moral)
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
          <Card  style={{ height: '24rem'}} className="tarjet-info">
              <Icons img={MEMBRESIA} alt="Membresia" width="100px" />
            <Card.Body>
              <Card.Title>Adquiere tu membresía</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-center">    
                  <p>Al adquirir tu membresía tendrás acceso total a la tecnología
                  de Distrito Pyme, herramientas, CRM, programa de incentivos,
                  convenciones y asignación automática de leads.</p>
                  <p>Inversión única de <b>$3,900 MXN IVA incluido</b> y la podrás pagar
                  a 3 ó 6 MSI.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
              <Icons img={HERRAMIENTAS} alt="Herramientas" width="100px" />
            <Card.Body>
              <Card.Title>Recibe tus herramientas</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-center">
                • ID exclusivo que te identifica como broker <br />
                • Acceso a CRM <br />
                • Plan de marketing y desarrollo de tu propia marca<br />
                • Tarjeta de presentación digital<br />
                • Y más
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
              <Icons img={GANAR_DINERO} alt="Ganar_dinero" width="100px" />
            <Card.Body>
              <Card.Title>Comienza a ganar dinero</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-center">
                <p>Ahora estás listo para ofrecer a tus clientes las mejores opciones
                de crédito.</p>

                <p className="font-weight-bold">¡Todo en menos de 15 min!</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    
    </div>
  );
}


export default Cards;