import React from 'react';
import BannerBrokers from './Banner/Banner';
import Info from './Info/Info';
import Cards from './Cards/Cards';
import Comunity from './Comunity/Comunity';

const BrokersLanding = () =>{
  return(
    <>
      <BannerBrokers />
      <div className="container-fluid">
        <Info />
        <Cards />
        <Comunity />
      </div>
    </>
  );
}

export default BrokersLanding;