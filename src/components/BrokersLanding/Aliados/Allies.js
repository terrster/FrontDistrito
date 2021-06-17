import React from 'react';
import Title from '../../Generic/Title';
import { Container } from 'react-bootstrap';
import Marquee from 'react-marquee-slider';
import  {imgFinancial}  from '../../../utils/Financials';

const Allies = () => {

  const allies = imgFinancial('ALL');

  return(
    <div className="container pt-5">
      <div className="text-center">
        <Title title="Nuestros Aliados" className="title-dp fw500 mb-1 fz42"/>
      </div>

      <Container>
        <Marquee velocity={12}>
          {
            allies.map((name, key) => {
              return <div  key={key}>
                <img className="imgAlianzaBrokers mr-3" src={name} alt={`allies${key}`} />
              </div>
            })
          }
        </Marquee>
      </Container>
  </div>
  );
}

export default Allies;