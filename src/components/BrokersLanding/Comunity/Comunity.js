import React from 'react';
import Title from '../../Generic/Title';
import { Container, Card} from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import '../../../css/brokers-landing.css'

import  {imgFinancial}  from '../../../utils/Financials';


const Allies = () => {

  const allies = imgFinancial('ALL');

  return(
    <div className="container pt-5">
      <div className="text-center">
        <Title title="Nuestros Aliados" className="title-dp fw500 mb-1 fz42"/>
      </div>

      <Container>
        <OwlCarousel
          className="alliesc"
          items={3}
          responsive={
            {
              576: {
                items: 3
              },
              768: {
                items: 5
              },
              992: {
                items: 7
              }
            }
          }
          docs={false}
          margin={20}
          loop={true}
          autoplay={true}
          autoplayHoverPause={true}>
          {
            allies.map((name, key) => {
              return <div className="item imgAlianza" key={key}>
                <img src={name} alt={`allies${key}`} />
              </div>
            })
          }
        </OwlCarousel>

      </Container>
  </div>
  );
}

export default Allies;