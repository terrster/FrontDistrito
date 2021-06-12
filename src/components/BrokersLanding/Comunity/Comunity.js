import React from 'react';
import Title from '../../Generic/Title';
//import { Container,Carousel} from 'react-bootstrap';

//import { imgFinancial } from '../../utils/Financials';



const Comunity = () => {

  // const allies = imgFinancial('ALL');

  // const [options] = useState([
  //   {
  //     loop: true,
  //     nav: false,
  //     autoplay: true,
  //     autoplayTimeout: 2000,
  //     startPosition: 'URLHash',
  //     responsive: {
  //       0: {
  //         items: 2,
  //       },
  //       600: {
  //         items: 3,
  //       },
  //       1000: {
  //         items: 4,
  //       },
  //     }
  //   }
  // ]);


  return(
    <div className="container pt-5">
      <div className="text-center">
        <Title title="Nuestros Aliados" className="title-dp fw500 mb-1 fz42"/>
      </div>

      {/* <Container>

        <Carousel  {...options[0]} >
          {
            allies.map((name, key) => {
              return <div className="item" key={key}>
                <img  allies={name} alt={`cliente${key}`} />
              </div>
            })
          }
        </Carousel>

      </Container> */}
  </div>
  );
}

export default Comunity;