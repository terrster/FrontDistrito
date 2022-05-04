import React, { useEffect, useState } from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card, Carousel, ImageBackground } from 'react-bootstrap';
import '../../../css/comunity.css';

import banner_web from '../../../assets/img/comunity/banner_web.png';
import banner_mobile from '../../../assets/img/comunity/banner_mobile.png';

const images = [banner_web, banner_mobile];

const getVersionImage = () => {
  const currentSize = document.getElementsByTagName('body')[0].clientWidth;
  return currentSize < 720 ? 1 : 0;
};


var calculated = false;

const Comunity = ({hubspotInfo, origen}) =>{

  const [versionImage, setVersionImage] = useState(getVersionImage());

  window.addEventListener('resize', () => setVersionImage(getVersionImage()));

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
              counter.innerText = hubspotInfo[target];
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
    <div className='imgcontainer'>
			
        <Card.Header id="header"  className="title-dp-blue fz48  fw300 text-left line-height"><span className='title-dp'> sé parte de nuestra </span> comunidad </Card.Header>
        
        <div className='backgroundComunity' style={{ backgroundImage: `url(${images[versionImage]})`, width: null, minHeight: '100vh', flex: 1 }}>
					
            
                <div id="comunityBrokers" className="mt-5">
                  <div id="counterContainer">
                  
                    <Row className="mt-3 w-100">
                      <Row className="rowcontenttop">
                      <Col xs={12} md={6} className='d-flex justify-content-center'>
                        <label className="title-cards-dp">dinero prestado</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Colocado">--</span>
                        </div>
                      </Col>
                      <Col xs={12} md={6} className='d-flex justify-content-center'>
                        <label className="title-cards-dp">{origen === 'landing' ? 'brokers digitales' : 'Brokers activos'}</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Brokers">--</span>
                        </div>
                      </Col>
                      </Row>
                      <Row className="mt-4 rowcontentbott">

                      <Col xs={12} md={6} className='d-flex justify-content-center'>
                        <label className="title-cards-dp">solicitudes</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Solicitudes">--</span>
                        </div>
                      </Col>

                      <Col xs={12} md={6} className='d-flex justify-content-center'>
                        <label className="title-cards-dp"> aliados financieros</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Alianzas">--</span>
                        </div>
                      </Col>
                      </Row>
                    </Row>
                  </div>
                </div>

          </div>
                
      </div>
  );
}

export default Comunity;