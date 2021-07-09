import React, { useCallback, useState, useEffect } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import '../../css/brokers-landing.css';
import ColocadoSound from '../../assets/sounds/Colocado.mp3';
import GeneralSound from '../../assets/sounds/General.mp3';
import { ToastContainer, toast } from "react-toastify";

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

        <Row className="pt-4">
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
          body{\
            background-color: #f4f4f4 !important;\
        }\
      "}</style>
    </div>
  );
}

export default Dashboard;