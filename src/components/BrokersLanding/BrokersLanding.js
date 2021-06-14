import React from 'react';
import {Button} from 'react-bootstrap';
import BannerBrokers from './Banner/Banner';
import Info from './Info/Info';
import Cards from './Cards/Cards';
import Allies from './Aliados/Allies';
import Comunity from './Comunity/Comunity';
import Testimonio from './Testimonios/Testimonio';
import { useHistory } from 'react-router-dom';

const BrokersLanding = () =>{

  const history = useHistory();

  return(
    <>
      <BannerBrokers />
      <div className="container-fluid">
        <Info />
        <Cards />
        <Comunity />
        <Allies />
        <Testimonio />
      </div>
      
      <div className="text-center mt-30 mb-30">
        <Button className="btn-blue-general ml-auto mr-auto" style={{ width: '250px' }} onClick={() => { history.push("/brokers")}}>
          Registrate aquí
        </Button>
      </div>
    </>
  );
}

export default BrokersLanding;