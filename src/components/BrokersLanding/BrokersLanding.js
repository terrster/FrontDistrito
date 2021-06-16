import React from 'react';
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

document.addEventListener("scroll", () => {
  let floatButton = document.getElementById("float-button-dp");
  let cardsBrokers = document.getElementById("cardsBrokers");
  let comunityBrokers = document.getElementById("comunityBrokers");
  let scrolled = document.scrollingElement.scrollTop;

  if (floatButton && cardsBrokers) {
    if (scrolled > cardsBrokers.offsetTop - 500 && scrolled < comunityBrokers.offsetTop + 100) {
      floatButton.style.display = 'block';
    }
    else{
      floatButton.style.display = 'none';
    }
  }
});

const history = useHistory();
 
  return(
    <>
      <BannerBrokers />
      <div className="brokers-container container-fluid">
        <Info />
        <Cards/>
        <Allies />
        <Comunity/>
        {/* <Testimonio /> */}
      </div>
      <BannerFinal />
      
      <div id="float-button-dp" className="float-button float-button-dp" onClick={() => { history.push("/brokers") }}>Conviértete en Broker</div>
      
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