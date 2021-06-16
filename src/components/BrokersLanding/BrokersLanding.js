import React from 'react';
import {Button} from 'react-bootstrap';
import BannerBrokers from './Banner/Banner';
import Info from './Info/Info';
import Cards from './Cards/Cards';
import  Comunity from './Comunity/Comunity';
import  Allies from './Aliados/Allies';
//import Testimonio from './Testimonios/Testimonio';
import BannerFinal from './BannerFinal/BannerFinal'
import '../../css/brokers-landing.css';

const BrokersLanding = () =>{

  return(
    <>
      <BannerBrokers />
      <div className="brokers-container container-fluid">
        <Info />
        <Cards />
        <Allies />
        <Comunity />
        {/* <Testimonio /> */}
      </div>
      <BannerFinal />
      <style>{"\
          #clgo{\
              display: none !important;\
          }\
          #clgo-wsp{\
              display: none !important;\
          }\
      "}</style>
    </>
  );
}

export default BrokersLanding;