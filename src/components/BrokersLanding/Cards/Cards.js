import React, { createRef} from 'react';
import Title from '../../Generic/Title';
import { Card, Row, Col, Image} from 'react-bootstrap';
import Icons from '../../Landing/Icons/Icons';
import '../../../css/brokers-landing.css';

import REQUISITOS_BÁSICOS_01 from '../../../assets/img/REQUISITOS BÁSICOS-01.png';


const Cards = () => {

  const counterRef = createRef();
  document.addEventListener("scroll", (e) => {
    let scrolled = document.scrollingElement.scrollTop;
    if (counterRef.current) {
      if (scrolled > counterRef.current.scrollTop + 100) {
        setTimeout(contador, 3000);
      }
    }
  });

  const contador = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 100;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = count + parseInt(inc);
          setTimeout(updateCount, 1);
        }
        else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  return(
    <div className="pt-5 text-center">
      <Title title="¿Cómo convertirme en Broker Digital?" className="title-dp fw500 mb-1 fz42"/>
    <div className="justify-content-center container pt-4">
      <Row className="justify-content-center container-xl">
          <Col xl={4} md={5} sm={7} className="mb-4">
          <Card style={{ height: '30rem' }} className="tarjet-info">
            <Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" />
            <Card.Body>
              <Card.Title>Registrate</Card.Title>
              <Card.Text >
                <div className="metropolisReg fz12 blackBlue text-left">
                Completa tu regitro y uno de nuestros asesores
                se pondrá en contacto contigo para ofrecerte mayor información.
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
          <Card style={{ height: '30rem' }} className="tarjet-info">
            <Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" />
            <Card.Body>
              <Card.Title>Firma tu contrato</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-left">
                Nuestro proceso de firma es 100% Digital.

                Necesitaras: <br />
                - INE. <br />
                - Comprobante de domicilio. <br />
                - RFC. <br />
                - Estado de cuenta bancario. <br />
                - Acta Constitutiva. (en caso de ser personal moral)
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
          <Card  style={{ height: '30rem'}} className="tarjet-info">
            <Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" />
            <Card.Body>
              <Card.Title>Adquiere tu membresia</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-left">    
                  Al adquirir tu membresia tendrás acceso total a la tecnología
                  de Distrito Pyme, herramientas, CRM, programa de incentivos,
                  convenciones y asignación automática de leads.
                  <br />
                  Inversión única de <b>$2,500 MXN +IVA</b> y la podrás pagar
                  a 3 o 6 MSI a través de nuestra alianza con
                  CLIP
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} md={5} sm={7} className="mb-4">
          <Card style={{ height: '30rem' }} className="tarjet-info">
            <Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" />
            <Card.Body>
              <Card.Title>Recibe tus herramientas</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-left">
                - ID exclusivo que te identifica como broker. <br />
                - Acceso a CRM. <br />
                - Plan de marketing y desarrollo de tu propia marca.<br />
                - Tarjeta de presentación digital.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

          <Col xl={4} md={5} sm={7} className="mb-4">
          <Card style={{ height: '30rem' }} className="tarjet-info">
            <Icons img={REQUISITOS_BÁSICOS_01} alt="Simulador" width="100px" />
            <Card.Body>
              <Card.Title>Comienza a ganar dinero</Card.Title>
              <Card.Text className="metropolisReg fz12 blackBlue text-left">
                Ahora estas listo para ofrecer a tus clientes las mejores opciones
                de crédito. <br />

                <b>¡Todo en menos de 15 min!</b>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>




      <div id="counterContainer" ref={counterRef}>
        <Title title="Sé parte de nuestra comunidad" className="subtitle-dp fz42 fw300 ls-01 pt-5" />

        <div className="counter" data-target="500" style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>0</div>

        <div className="counter" data-target="100" style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>0</div>

        <div className="counter" data-target="15000" style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>0</div>

        <div className="counter" data-target="21" style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>0</div>

        <Title title="8 DE CADA 10 SOLICITUDES RECIBE UNA OPCIÓN DE CRÉDITO" className="title-dp fw500 mb-1 fz32" />
      </div>

    </div>
  );
}


export default Cards;