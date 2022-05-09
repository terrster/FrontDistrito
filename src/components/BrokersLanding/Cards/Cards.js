import React from 'react';
import Title from '../../Generic/Title';
import { Card, Row, Col } from 'react-bootstrap';
import Icons from '../../Landing/Icons/Icons';

import REGISTRATE from '../../../assets/img/brokers-landing/iconos/registrate.png';
import FIRMA from '../../../assets/img/brokers-landing/iconos/firma.png';
import MEMBRESIA from '../../../assets/img/brokers-landing/iconos/membresia.png';
import HERRAMIENTAS from '../../../assets/img/brokers-landing/iconos/recibe_herramientas.png';
import GANAR_DINERO from '../../../assets/img/brokers-landing/iconos/gana_dinero.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faPager } from '@fortawesome/free-solid-svg-icons';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

  

const Cards = () => {

  const element = (icon) => <FontAwesomeIcon icon={icon} size='6x' transform="shrink-6" mask={faCircle}/>
  return(
    <div id="cardsBrokers" className="pt-5 text-center">
      <Title title="¿Cómo convertirme en Broker Digital?" className="title-dp fw500 mb-1 fz42"/>
    <div className="justify-content-center container container-xl pt-4">
      <Row className="justify-content-center">
          <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
            <div className="icon-image mb-2 mr-auto ml-auto mt-4">
                    {element(faFileInvoice)}
            </div>
            <Card.Body>
              <Card.Title>regístrate</Card.Title>
              <Card.Text >
                <div className="metropolisReg text-center">
                completa tu registro y uno de nuestros asesores
                se pondrá en contacto contigo para ofrecerte mayor información.
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
            <div className="icon-image mb-2 mr-auto ml-auto mt-4">
                    {element(faSignature)}
            </div>
            <Card.Body>
              <Card.Title>firma tu contrato</Card.Title>
              <Card.Text className="metropolisReg text-center">
                nuestro proceso de firma es 100% Digital.

                Necesitarás: <br />
                • INE <br />
                • comprobante de domicilio <br />
                • constancia de situación Fiscal <br />
                • estado de cuenta bancario <br />
                • acta Constitutiva (en caso de ser personal moral)
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
          <Card  style={{ height: '24rem'}} className="tarjet-info">
          <div className="icon-image mb-2 mr-auto ml-auto mt-4">
                    {element(faIdCard)}
            </div>
            <Card.Body>
              <Card.Title>adquiere tu membresía</Card.Title>
              <Card.Text className="metropolisReg text-center">    
                  <p>al adquirir tu membresía tendrás acceso total a la tecnología
                  de distrito pyme, herramientas, CRM, programa de incentivos,
                  convenciones y asignación automática de leads.</p>
                  <p>inversión única de <b>$3,900 MXN IVA incluido</b> y la podrás pagar
                  a 3 ó 6 MSI.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
            <div className="icon-image mb-2 mr-auto ml-auto mt-4">
                    {element(faBook)}
            </div>
            <Card.Body>
              <Card.Title>recibe tus herramientas</Card.Title>
              <Card.Text className="metropolisReg text-center">
                • id exclusivo que te identifica como broker <br />
                • acceso a CRM <br />
                • plan de marketing y desarrollo de tu propia marca<br />
                • tarjeta de presentación digital<br />
                • Y más
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
            <Card style={{ height: '24rem' }} className="tarjet-info">
            <div className="icon-image mb-2 mr-auto ml-auto mt-4">
                    {element(faChartLine)}
            </div>
            <Card.Body>
              <Card.Title>comienza a ganar dinero</Card.Title>
              <Card.Text className="metropolisReg text-center">
                <p>ahora estás listo para ofrecer a tus clientes las mejores opciones
                de crédito.</p>

                <p className="font-weight-bold">¡todo en menos de 15 min!</p>
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