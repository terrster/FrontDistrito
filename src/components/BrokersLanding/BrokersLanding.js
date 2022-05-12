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
import Title from '../Generic/Title';
import ReactPlayer from 'react-player';
import AlliesLanding from "../Landing/AlliesLanding/AlliesLanding";
import { Card } from 'react-bootstrap';

const BrokersLanding = () => {

  document.addEventListener("scroll", () => {
    let floatButton = document.getElementById("float-button-dp");
    let cardsBrokers = document.getElementById("cardsBrokers");
    let comunityBrokers = document.getElementById("comunityBrokers");
    let scrolled = document.scrollingElement.scrollTop;

    if (floatButton && cardsBrokers) {
      if (scrolled > cardsBrokers.offsetTop - 500 && scrolled < comunityBrokers.offsetTop + 100) {
        floatButton.style.display = 'block';
      }
      else {
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
    if (socket) {

      socket.on('hubspotInfo', (callback) => {
        callback.data.ColocadoFormatted = callback.data.Colocado;
        callback.data.Colocado = callback.data.ColocadoFormatted.replace(/[$,.]/g, "");
        setHubspotInfo(callback.data);
      });

    }
  }, [socket]);

  window.scrollTo(0, 0)
  return (
    <>
      <BannerBrokers />
      <div className="brokers-container container-fluid">
        <div style={{ backgroundColor:'var(--black04)', margin:'0',}}>
          <Info/>
        </div>
        <Cards />
        <AlliesLanding />
        <Comunity hubspotInfo={hubspotInfo} />
        {/* <Testimonio /> */}
        <Card.Header id="header"  className="title-dp-blue fz42  fw300 text-left line-height"><span className='title-dp'> 8 de cada 10 </span> digitales distrito pyme </Card.Header>
        <div style={{ maxWidth: '1000px' }} className="ml-auto mr-auto pb-5">
          <ReactPlayer width="100%" height="400px" style={{ maxWidth: '1000' }} url="https://www.youtube.com/watch?v=yhs3J5ZTvZU" />
        </div>
      
      </div>
      <BannerFinal />

      <div id="float-button-dp" className="float-button float-button-dp" onClick={() => { history.push("/brokers-registro") }}>conviértete en broker</div>

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