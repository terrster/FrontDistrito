import React from 'react';
import Title from '../../Generic/Title';
import { Container} from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import '../../../css/brokers-landing.css'

import  {imgFinancial}  from '../../../utils/Financials';


const Comunity = () => {

  const allies = imgFinancial('ALL');

  return(
    <div className="container pt-5">
      <div className="text-center">
        <Title title="Nuestros Aliados" className="title-dp fw500 mb-1 fz42"/>
      </div>

      <Container>
        <OwlCarousel
          className="alliesc owl-theme"
          center={false}
          items={7}
          center={true}
          responsive = {
            678 = {
              mergeFit:true
            }
          }
          margin={20}
          loop={true}
          autoplay={true}
          autoplayHoverPause={true}>
          {
            allies.map((name, key) => {
              return <div className="item" key={key}>
                <img src={name} alt={`allies${key}`} />
              </div>
            })
          }
        </OwlCarousel>

      </Container>
  </div>
  );
}

export default Comunity;