import React, { useCallback, useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';
import '../../css/brokers-landing.css';
import useSound from 'use-sound';
import ColocadoSound from '../../assets/sounds/Colocado.mp3'
import GeneralSound from '../../assets/sounds/General.mp3'


const Dashboard = () => {

  const [play] = useSound(ColocadoSound);
  const [General] = useSound(GeneralSound);

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

  window.onload = function () {
    setTimeout(connectSocket, 1000);
  };

  // useEffect(() => {
  //   connectSocket();
  // }, []);

  useEffect(() => {
    if (socket) {

      socket.on('hubspotInfo', (callback) => {
        callback.data.ColocadoFormatted = callback.data.Colocado;
        callback.data.Colocado = callback.data.ColocadoFormatted.replace(/[$,.]/g, "");
        setHubspotInfo(callback.data);
      });

    }
  }, [socket]);

  ///////

  const contador = () => {
    const counters = document.querySelectorAll('.counter');
    // const speed = 500;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = counter.getAttribute('data-target');
        const targetValue = parseInt(hubspotInfo[target]);
        const count = +counter.innerText;
        // const inc = targetValue / speed;

        if (targetValue > 0) {
          if (count < targetValue) {
            if (targetValue > 10000) {
              counter.innerText = parseInt(count + (targetValue / 50));
            }
            else if (targetValue > 500 && targetValue < 10000) {
              counter.innerText = parseInt(count + (targetValue / 100));
            }
            else {
              counter.innerText = count + 1;
            }
            setTimeout(updateCount, 1);
          }
          else {
            if (target === "Colocado") {
              counter.innerText = hubspotInfo.ColocadoFormatted + " M";
            }
            else {
              counter.innerText = new Intl.NumberFormat().format(targetValue).toString().replace('.', ',');
            }
          }
        }
      };
      updateCount();
    });
  }

  useEffect(() => {
    if (hubspotInfo) {
         contador();
         play();
    }
  }, [hubspotInfo]);

  return(
    <div className="dashboard container-fluid text-center">
        <Row className="mt-5">
          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Monto colocado</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Colocado">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Brokers activos</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Brokers">0</span>
            </div>
          </Col>

          <Col lg={12} md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Brokers</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Brokers">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue">Solicitudes</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Solicitudes">0</span>
            </div>
          </Col>

          <Col md={6} className="mb-4">
            <label className="metropolisReg fz32 blackBlue"> Aliados financieros</label>
            <div className="titulos coolvetica">
              <span className="counter" data-target="Alianzas">0</span>
            </div>
          </Col>
        </Row>

      <style>{"\
          #clgo{\
              display: none !important;\
          }\
          #clgo-wsp{\
              display: none !important;\
          }\
          #navbar-dp{\
              display: none !important;\
          }\
          #footer-dp{\
              display: none !important;\
          }\
      "}</style>
    </div>
  );
}

export default Dashboard;