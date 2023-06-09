import React, { useEffect, useState } from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card, Carousel, ImageBackground } from 'react-bootstrap';
import '../../../css/comunity.css';

import banner_web from '../../../assets/img/comunity/banner_web.png';
import banner_mobile from '../../../assets/img/comunity/banner_mobile.png';

const images = [banner_web, banner_mobile];


var calculated = false;
const getHeight = () => {
	let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
	let isTablet = window.matchMedia("only screen and (max-width: 1024px)").matches;
	let isDesktop = window.matchMedia("only screen and (min-width: 1025px)").matches;

	if (isMobile) {
		return 1;
	} else if (isTablet) {
		if (window.innerWidth < 950 && window.innerHeight < 767) {
			return 1;
		} else {
			return 2;
		}
	} else if (isDesktop) {
		if (window.innerWidth > 1080) {
			return 0;
		} else {
			return 2;
		}
	}
}

const Comunity = ({hubspotInfo, origen, estado}) =>{

  const [versionImage, setVersionImage] = useState(0);
  const [height, setHeight] = useState(getHeight());

  useEffect(() => {
    setHeight(getHeight());
		setVersionImage(estado)
	}, [estado]);

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
    <div className='imgcontainer' id="comunityBrokers">
			
        <Card.Header id="header"  className={`title-dp-blue fz48  fw300 text-left mt-3`} style={{lineHeight:'2.4rem'}}><span className={`${origen === 'landing'? 'title-dp' : 'title'}`}> sé parte de nuestra </span> comunidad </Card.Header>
        
        <div className={height === 2 ? 'tablet' : 'backgroundComunity'} style={{ backgroundImage: `url(${images[versionImage]})`, width: null, minHeight: '100vh', flex: 1 }}>
					
            
                <div id="comunityBrokers" className="mt-5">
                  <div id="counterContainer">
                  
                    <Row className="mt-3 w-100">
                      <Row className="rowcontenttop">
                        {
                          versionImage === 0 ? (
                            <>
                              <Col xs={12} md={12} className='d-flex align-items-center flex-column title-dp-blue'>
                                  <label className="title-dp">{origen === 'landing' ? 'dinero prestado' : 'monto colocado'}</label>
                                  <div className="titulos coolvetica">
                                    <span className="counter" data-target="Colocado">--</span>
                                  </div>
                              </Col>
                            </>
                          ):(
                            <>
                            <Col xs={12} md={6} className='d-flex align-items-center flex-column'>
                                  <label className="title-dp">{origen === 'landing' ? 'dinero prestado' : 'monto colocado'}</label>
                                  <div className="titulos coolvetica">
                                    <span className="counter" data-target="Colocado">--</span>
                                  </div>
                            </Col>
                            <Col xs={12} md={6} className='d-flex align-items-center flex-column'>
                            <label className="title-dp">{origen === 'landing' ? 'brokers digitales' : 'brokers activos'}</label>
                            <div className="titulos coolvetica">
                              <span className="counter" data-target="Brokers">--</span>
                            </div>
                            </Col>
                            </>
                          )
                        }
                      </Row>
                      <Row className="mt-4 rowcontentbott">
                            {
                              versionImage === 0 ? (
                                <>
                                  <Col xs={12} md={4} className='d-flex align-items-center flex-column'>
                            <label className="title-dp">{origen === 'landing' ? 'brokers digitales' : 'brokers activos'}</label>
                            <div className="titulos coolvetica">
                              <span className="counter" data-target="Brokers">--</span>
                            </div>
                            </Col>

                      <Col xs={12} md={4} className='d-flex align-items-center flex-column'>
                        <label className="title-dp">solicitudes</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Solicitudes">--</span>
                        </div>
                      </Col>

                      <Col xs={12} md={4} className='d-flex align-items-center flex-column'>
                        <label className="title-dp"> aliados financieros</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Alianzas">--</span>
                        </div>
                      </Col>
                                </>
                              ):(
                                <>
                      <Col xs={12} md={6} className='d-flex align-items-center flex-column'>
                        <label className="title-dp">solicitudes</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Solicitudes">--</span>
                        </div>
                      </Col>

                      <Col xs={12} md={6} className='d-flex align-items-center flex-column'>
                        <label className="title-dp"> aliados financieros</label>
                        <div className="titulos coolvetica">
                          <span className="counter" data-target="Alianzas">--</span>
                        </div>
                      </Col>
                                </>
                              )
                            }
                      </Row>
                    </Row>
                  </div>
                </div>

          </div>
                
      </div>
  );
}

export default Comunity;