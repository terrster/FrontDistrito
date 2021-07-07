import React, { useCallback, useState, useEffect } from 'react';
import BannerBrokers from './Banner/Banner';
import Info from './Info/Info';
import Cards from './Cards/Cards';
import Comunity from './Comunity/Comunity';
import Allies from './Aliados/Allies';
//import Testimonio from './Testimonios/Testimonio';
import BannerFinal from './BannerFinal/BannerFinal'
import '../../css/brokers-landing.css';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

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

  const [socket, setSocket] = useState(null);
  const [hubspotInfo, setHubspotInfo] = useState({
    Colocado: 0,
    ColocadoFormatted: 0,
    Pymes: 0,
    Brokers: 0,
    Alianzas: 0,
    Solicitudes: 0
  });
  const connectSocket = useCallback(() => {//process.env.REACT_APP_BACKEND, https://apidev.distritopyme.com/
    const socket = io.connect(process.env.REACT_APP_BACKEND, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: {
          'origin': 'hubspotInfo'
      }
    });
    setSocket(socket);
  }, []);

  useEffect(() => {
    connectSocket();
  }, []);

  useEffect(() => {
    if(socket){

        socket.on('hubspotInfo', (callback) => {
          callback.ColocadoFormatted = callback.Colocado;
          callback.Colocado = callback.ColocadoFormatted.replace(/[$,.]/g, "");
          setHubspotInfo(callback);
        });

    }
}, [socket]);

 
  return(
    <>
      <BannerBrokers />
      <div className="brokers-container container-fluid">
        <Info />
        <Cards/>
        <Allies />
        <Comunity hubspotInfo={hubspotInfo}/>
        {/* <Testimonio /> */}
      </div>
      <BannerFinal />
      
      <div id="float-button-dp" className="float-button float-button-dp" onClick={() => { history.push("/brokers-registro") }}>Conviértete en Broker</div>
      
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