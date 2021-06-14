import React from 'react';
import Title from '../../Generic/Title';
import { Container, Card } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import '../../../css/brokers-landing.css'

const Testimonio = () => {

  const testimonios = [{
    name: 'Broker 1',
    msg: 'Excelente ambiente de trabajo'
  },
  {
    name: 'Broker 2',
    msg: 'Cuentan con herramientas que agilizan los procesos'
  },
  {
    name: 'Broker 3',
    msg: 'Facil contratación'
  },

  {
    name: 'Broker 4',
    msg: 'Capacitación constante'
  },

  ]
  return(
    <div className="container pt-5">
     <div className="text-center">
        <Title title="Testimonios" className="title-dp fw500 mb-1 fz42" />
      </div>

      <Container>
        <OwlCarousel
          className="alliesc"
          items={1}
          margin={20}
          loop={true}
          autoplay={true}
          center={true}
          autoplayHoverPause={true}>
        {
          testimonios.map((testimonio, key) => {
            return <blockquote className="quote-card item" key={key}>
              <p>
                {testimonio.msg}
              </p>

              <cite>
                {testimonio.name}
              </cite>
            </blockquote>
          })
        }
        </OwlCarousel>
      </Container>
    </div>
  );
}

export default Testimonio;