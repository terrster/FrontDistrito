import React, { useEffect } from 'react';
import Title from '../../Generic/Title';
import { Row, Col } from 'react-bootstrap';
var calculated = false;
const Comunity = ({hubspotInfo}) =>{

  // const [calculated, setCalculated] = useState(false);

  document.addEventListener("scroll", () => {
    let counterContainer = document.getElementById('counterContainer');
    let scrolled = document.scrollingElement.scrollTop;
    console.log("scrolled" + scrolled);
    console.log(counterContainer.offsetTop - 256);
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
        const count = +counter.innerText;
        // const inc = targetValue / speed;

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
            counter.innerText = hubspotInfo.ColocadoFormatted;
          }
          else{
            // counter.innerText = new Intl.NumberFormat().format(targetValue).toString().replace('.', ',');
            counter.innerText = targetValue;
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
      // console.log("scrolled" + scrolled);
      // console.log(counterContainer.offsetTop - 200);
      if (counterContainer && scrolled > (counterContainer.offsetTop - 256)){
        contador();
      }
    }
  }, [hubspotInfo]);

  return (
    <div id="comunityBrokers" className="pt-3 pb-5 text-center">
      <div id="counterContainer">
        <Title title="Sé parte de nuestra comunidad"  className="title-dp fw500 mb-1 fz42 ls-01 pt-5"/>
        <Row className="mt-5">
          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Monto colocado</label>
            <div className="titulos coolvetica">
              +<span className="counter" data-target="Colocado">0</span>M
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Brokers activos</label>
            <div className="titulos coolvetica">
              +<span className="counter" data-target="Brokers">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Solicitudes</label>
            <div className="titulos coolvetica">
              +<span className="counter" data-target="Solicitudes">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue"> Aliados financieros</label>
            <div className="titulos coolvetica">
              +<span className="counter" data-target="Alianzas">0</span>
            </div>
          </Col>
        </Row>

        <Title title="8 De Cada 10 Solicitudes Recibe Una Opción De Crédito" className="title-dp fw500 mt-5 fz32" />
      </div>
    </div>
  );
}

export default Comunity;