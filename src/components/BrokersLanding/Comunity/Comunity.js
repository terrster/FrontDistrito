import React from 'react';
import Title from '../../Generic/Title';
import { Container,Carousel} from 'react-bootstrap';

import { imgFinancial } from '../../../utils/Financials';



const Comunity = () => {

  const allies = imgFinancial('ALL');

  return(
    <div className="container pt-5">
      <div className="text-center">
        <Title title="Nuestros Aliados" className="title-dp fw500 mb-1 fz42"/>
      </div>

      <Container>

        <Carousel>
          {
            allies.map((name, key) => {
              return <Carousel.Item key={key}>
                <img src={name} alt={`allies${key}`} className="imgAlianza" />
              </Carousel.Item>
            })
          }
        </Carousel>

      </Container>
  </div>
  );
}

export default Comunity;