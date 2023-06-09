import React, { useCallback, useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import '../../css/dashboard.css';
import ColocadoSound from '../../assets/sounds/Colocado.mp3';
import GeneralSound from '../../assets/sounds/General.mp3';
import { ToastContainer, toast } from "react-toastify";
import LOGO from '../../assets/img/home/LOGO_DP_WHITE.png';

var calculated = false;

const Dashboard = () => {

  const [section, setSection] = useState(true);

  let today = new Date();
  let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  let date = today.getDate() + ' de ' + months[(today.getMonth()+1)-1] + ' de ' + today.getFullYear();

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
            toast.success("Colocamos un nuevo crédito 💰");
            Colocado.play();
            await sleep(Colocado.duration * 1000);
          }
          
          if(callback.difference.includes('Pymes')){
            toast.warning("Logramos apoyar a una nueva pyme 🏢");
            General.play();
            await sleep(General.duration * 1100);
          }

          if(callback.difference.includes('Brokers')){
            toast.info("Un nuevo broker se nos ha unido 👨‍💼");
            General.play();
            await sleep(General.duration * 1200);
          }

          if(callback.difference.includes('Alianzas')){
            toast.error("Formalizamos una nueva alianza 🤝");
            General.play();
            await sleep(General.duration * 1300);
          }

          if(callback.difference.includes('Solicitudes')){
            toast.info("Recíbimos una nueva solicitud 📝");
            General.play();
            await sleep(General.duration * 1400);
          }
        }
      });

    }
  }, [socket]);

  const contador = () => {
    const counters = document.querySelectorAll('.counter');
    // const speed = 500;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = counter.getAttribute('data-target');
        const targetValue = parseInt(hubspotInfo[target]);
        const count = counter.innerText === '--' ? 0 : +counter.innerText;
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
              counter.innerText = hubspotInfo[target];
            }
          }
        }
      };
      updateCount();
    });
    calculated = true;
  }

  useEffect(() => {
    if (hubspotInfo && !show) {
        contador();
    }
  }, [hubspotInfo]);

  useEffect(() => {
    if (!show){
      setTimeout(() => {
        document.getElementById("dashboard-container").style.visibility = 'hidden';
        document.getElementById("dashboard-container").style.opacity = '0';
      }, 9000)

      setTimeout(() => {
        setSection(section => !section);
      }, 10000)
      
      setTimeout(() => {
        document.getElementById("dashboard-container").style.visibility = 'visible';
        document.getElementById("dashboard-container").style.opacity = '1';
      }, 10500)

      contador();
    }
  }, [section, show]);

  return(
    <>
      <div id="dashboard" className="dashboard">
        <video id="video-dashboard" src="https://distrito-pyme-media.s3.us-west-2.amazonaws.com/back.mp4" autoPlay muted loop>
        </video>

        <Modal show={show} backdrop="static" keyboard={false} centered size={"lg"}>
          <Modal.Header>
            <Modal.Title className="m-auto">¡Aviso!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center text-justify"><strong>Distrito Pyme</strong> reproducirá algunos sonidos que estarán conectados al entorno en tiempo real</Modal.Body>
          <Modal.Footer>
              <Button className="btn-blue-general m-auto" style={{ width: '180px' }} onClick={() => setShow(false)}>
                Aceptar
              </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />


        <Container className="dashboard-container container-xl-fluid">
          <div id="dashboard-container" >
            {
              section &&
              <Row className="d-flex align-items-center">
                <Col md={6} className="mb-3">
                  <div className="text-center">
                    <label className="dashboard-label label-solicitudes">Solicitudes</label>
                    <div className="dashboard-data">
                      <span className="counter" data-target="Solicitudes">0</span>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-3">
                  <div className="text-center">
                    <label className="dashboard-label label-pymes">Pymes Apoyadas</label>
                    <div className="dashboard-data">
                      <span className="counter" data-target="Pymes">0</span>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-3">
                  <div className="text-center">
                    <label className="dashboard-label label-brokers">Brokers Activos</label>
                    <div className="dashboard-data">
                      <span className="counter" data-target="Brokers">0</span>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-3">
                  <div className="text-center">
                    <label className="dashboard-label label-financieros"> Aliados financieros</label>
                    <div className="dashboard-data">
                      <span className="counter" data-target="Alianzas">0</span>
                    </div>
                  </div>
                </Col>
              </Row>
            }

            {
              !section &&
              <Row id="monto-colocado" className="d-flex align-items-center">
                <Col sm={12} className="mb-10">
                  <div className="text-center">
                    <label className="dashboard-label label-monto">Monto colocado</label>
                    <div className="dashboard-data">
                      <span className="counter" data-target="Colocado">0</span>
                    </div>
                  </div>
                </Col>
              </Row>
            }
          </div>
          <div className="dashboard-label-date">
            <img src={LOGO} className="dashboard-logo" />
            {date}
          </div>
        </Container>

        

        
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
            background-color: #ffff !important;\
          }\
      "}</style>
  
    </>
  );
}

export default Dashboard;