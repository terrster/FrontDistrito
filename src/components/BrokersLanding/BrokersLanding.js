import React from 'react';
import {Button} from 'react-bootstrap';
import BannerBrokers from './Banner/Banner';
import Info from './Info/Info';
import Cards from './Cards/Cards';
import  Comunity from './Comunity/Comunity';
import  Allies from './Aliados/Allies';
//import Testimonio from './Testimonios/Testimonio';
import { useHistory } from 'react-router-dom';

import BANNER_WEB from '../../../src/assets/img/brokers-landing/BANNER_final.jpg';


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
      
      <div className="text-center mt-30 mb-30">
        <Button className="btn-blue-general ml-auto mr-auto" style={{ width: '250px' }} onClick={() => { history.push("/brokers")}}>
          Registrate aquí
        </Button>
      </div>

      <div className="mb-5">
        <img
          className="d-block w-100"
          src={BANNER_WEB} alt="WEB"
        />
      </div>
    </>
  );
}

export default BrokersLanding;