import React, { useCallback, useState, useEffect } from 'react';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import '../../css/brokers-landing.css';
import ColocadoSound from '../../assets/sounds/Colocado.mp3';
import GeneralSound from '../../assets/sounds/General.mp3';
import { ToastContainer, toast } from "react-toastify";
import LOGO from '../../assets/img/logo_dp/extras-03.png';

const Dashboard = () => {

  const [Colocado] = useState(new Audio(ColocadoSound));
  const [General] = useState(new Audio(GeneralSound));
  const [show, setShow] = useState(true);

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
    if(!show){
      setTimeout(connectSocket, 1);
    }
  }, [show]);

  const sleep = m => new Promise(r => setTimeout(r, m));

  useEffect(() => {
    if (socket) {
      socket.on('hubspotInfo', async(callback) => {
        callback.data.ColocadoFormatted = callback.data.Colocado;
        callback.data.Colocado = callback.data.ColocadoFormatted.replace(/[$,.]/g, "");
        setHubspotInfo(callback.data);

        if(callback.difference.length){
          if(callback.difference.includes('Colocado')){
            toast.success(<span dangerouslySetInnerHTML={{ __html: "Hemos colocado un nuevo crédito &#128276;" }}/>);
            Colocado.play();
            await sleep(Colocado.duration * 1000);
          }
          
          if(callback.difference.includes('Pymes')){
            General.play();
            await sleep(General.duration * 1000);
          }

          if(callback.difference.includes('Brokers')){
            General.play();
            await sleep(General.duration * 1000);
          }

          if(callback.difference.includes('Alianzas')){
            General.play();
            await sleep(General.duration * 1000);
          }

          if(callback.difference.includes('Solicitudes')){
            General.play();
            await sleep(General.duration * 1000);
          }
        }
      });

    }
  }, [socket]);

  const contador = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = counter.getAttribute('data-target');
        const targetValue = parseInt(hubspotInfo[target]);
        const count = +counter.innerText;

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
    if (hubspotInfo && !show) {
        contador();
    }
  }, [hubspotInfo]);

  return(
    <>
      <div id="dashboard" className="dashboard container-fluid text-center">
        <Modal show={show} backdrop="static" keyboard={false} centered size="lg">
          <Modal.Header>
            <Modal.Title className="m-auto fz32">¡Aviso!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center text-justify fz22"><strong>Distrito Pyme</strong> reproducirá algunos sonidos que estarán conectados al entorno en tiempo real</Modal.Body>
          <Modal.Footer>
              <Button className="btn-blue-general m-auto" style={{ width: '180px' }} onClick={() => setShow(false)}>
                Aceptar
              </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />

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
          body{\
            background-color: #f4f4f4 !important;\
        }\
      "}</style>
  
    </>
  );
}

export default Dashboard;