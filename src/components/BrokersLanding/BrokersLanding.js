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
import { useHistory } from 'react-router-dom';


const BrokersLanding = () =>{

const history = useHistory();
 
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
      <a
        target="_blank"
        rel="noreferrer"
      >
        <div className="nav-bar-icon header-button fz24 bluePrimary" onClick={() => { history.push("/brokers") }}>Conviértete en Broker</div>
      </a>
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