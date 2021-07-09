import React, { useCallback, useState, useEffect } from 'react';
import {Row, Col,Card} from 'react-bootstrap';
import io from 'socket.io-client';
import '../../css/brokers-landing.css';

import LOGO from '../../assets/img/logo_dp/extras-03.png'



const Dashboard = () => {

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
    }
  }, [hubspotInfo]);

  return(
    <>
     <div className="dashboard container-fluid text-center">
        <Row>
          <Col md={12}>
            <img src={LOGO} width="300px" />
          </Col>
        </Row>

        <Row className="mb-3">

          <Col md={6}>
            <Card border="light" style={{ height: '11rem' }}>
              <Card.Header id="box" className="card-header metropolisReg fz32 blackBlue">Monto Colocado</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="titulos coolvetica">
                    <span className="counter" data-target="Colocado">0</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card border="light" style={{ height: '11rem' }}>
              <Card.Header className="metropolisReg fz32 blackBlue">Aliados Financieros</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="titulos coolvetica">
                    <span className="counter" data-target="Alianzas">0</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card border="light" style={{ height: '11rem' }}>
              <Card.Header className="metropolisReg fz32 blackBlue">Solicitudes</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="titulos coolvetica">
                    <span className="counter" data-target="Solicitudes">0</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} >
            <Card border="light" style={{ height: '11rem' }}>
              <Card.Header className="metropolisReg fz32 blackBlue">Pymes Apoyados</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="titulos coolvetica">
                    <span className="counter" data-target="Pymes">0</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} >
            <Card border="light" style={{ height: '11rem' }}>
              <Card.Header className="metropolisReg fz32 blackBlue">Brokers Activos</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="titulos coolvetica">
                    <span className="counter" data-target="Brokers">0</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          
       </Row>

       

       
     </div>

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
  
  </>
  );
}

export default Dashboard;