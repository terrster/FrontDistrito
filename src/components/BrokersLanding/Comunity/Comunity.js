import React, { useEffect } from 'react';
import Title from '../../Generic/Title';
import { Row, Col } from 'react-bootstrap';

var calculated = false;

const Comunity = ({hubspotInfo}) =>{

  document.addEventListener("scroll", () => {
    let counterContainer = document.getElementById('counterContainer');
    let scrolled = document.scrollingElement.scrollTop;
      if (counterContainer && !calculated && scrolled > counterContainer.offsetTop - 256) {
        setTimeout(contador, 500);
      }
  });

  const contador = () => {
    const counters = document.querySelectorAll('.counter');
    // const speed = 500;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = counter.getAttribute('data-target');
        const targetValue = parseInt(hubspotInfo[target]);
        const count = counter.innerText === '--' ? 0 : +counter.innerText;
        // const inc = targetValue / speed;

        if(targetValue > 0){
          if (count < targetValue) {
            if (targetValue > 10000) {
              counter.innerText = parseInt(count + (targetValue / 50));
            }
            else if(targetValue > 500 && targetValue < 10000){
              counter.innerText = parseInt(count + (targetValue / 100));
            }
            else {
              counter.innerText = count + 1;
            }
            setTimeout(updateCount, 1);
          }
          else {
            if(target === "Colocado"){
              counter.innerText = hubspotInfo.ColocadoFormatted + " M";
            }
            else{
              counter.innerText = new Intl.NumberFormat().format(targetValue).toString().replace('.', ',');
            }
          }
        }
      };
      updateCount();
    });
    calculated = true;
  }

  useEffect(() => {
    if(hubspotInfo){
      let counterContainer = document.getElementById('counterContainer');
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if (counterContainer && scrolled > (counterContainer.offsetTop - 256)){
        contador();
      }
    }
  }, [hubspotInfo]);

  return (
    <div id="comunityBrokers" className="pb-5 text-center">
      <div id="counterContainer">
        <Title title="Sé parte de nuestra comunidad"  className="title-dp fw500 mb-1 fz42 ls-01"/>
        <Row className="mt-5">
          <Col md={6} className="mb-4">
            <label className="title-cards-dp fz32">Monto colocado</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Colocado">--</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="title-cards-dp fz32">Brokers activos</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Brokers">--</span>
            </div>
          </Col>

          <Col md={6}>
            <label className="title-cards-dp fz32">Solicitudes</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Solicitudes">--</span>
            </div>
          </Col>

          <Col md={6}>
            <label className="title-cards-dp fz32"> Aliados financieros</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Alianzas">--</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Comunity;