import React, { createRef } from 'react';
import Title from '../../Generic/Title';
import { Row, Col } from 'react-bootstrap';
import '../../../css/brokers-landing.css';

const Comunity = () =>{

  const counterRef = createRef();
  document.addEventListener("scroll", (e) => {
    let scrolled = document.scrollingElement.scrollTop;
    if (counterRef.current) {
      if (scrolled > counterRef.current.offsetTop - 100) {
        setTimeout(contador, 500);
      }
    }
  });

  const contador = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 500;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          if (target > 100) {
            counter.innerText = count + inc;
          }
          else {
            counter.innerText = count + 1;
          }
          setTimeout(updateCount, 1);
        }
        else {
          counter.innerText = new Intl.NumberFormat().format(target).toString().replace('.', ',');
        }
      };
      updateCount();
    });
  }

  return (
    <div id="comunityBrokers" className="pt-3 pb-5 text-center">
      <div id="counterContainer" ref={counterRef}>
        <Title title="Sé parte de nuestra comunidad"  className="title-dp fw500 mb-1 fz42 ls-01 pt-5"/>
        <Row className="mt-5">
          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Monto colocado</label>
            <div className="titulos coolvetica">
              +<span className="counter" data-target="500">0</span>M
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Brokers activos</label>
            <div className="titulos coolvetica">
              +<span className="counter" data-target="100">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Solicitudes</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="15000">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue"> Aliados financieros</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="21">0</span>
            </div>
          </Col>
        </Row>

        <Title title="8 De Cada 10 Solicitudes Recibe Una Opción De Crédito" className="title-dp fw500 mt-5 fz32" />
      </div>
    </div>
  );
}

export default Comunity;