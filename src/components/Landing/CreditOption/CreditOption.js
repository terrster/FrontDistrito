import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


import LOGODP from '../../../assets/img/logo_dp/extras-03.png';

import '../../../css/creditoption.css';



const CreditOption = () => {

  const history = useHistory();

  
  return (
    <>
      <div id="creditoption" className="pt-4 text-center ml-auto mr-auto">

        <Title title="8 De cada 10 solicitudes recibe una opción de crédito" className="title-dp fz29  fw300" />

        <Title title="Existe una infinidad de opciones de crédito, pero solo una plataforma con todas esas opciones en una sola solicitud" className="subtitle-dp fz12 text-center mb-30" />

        <Row className="justify-content-center mt-3">
          <Col xl={4} md={5} sm={6} xs={8} className="mb-4">
            <Card id="card-credit" className="fondo-card" style={{ height: '26.3rem' }}>
              <Card.Header id="header" style={{ height: '5rem' }} className="title-cards-dp fz25">Bancos, financieras y fintechs</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="text-dp fz12  text-left">
                  <ul className="bancos-list">
                    <li>Tienes que ir de sucursal en sucursal o de página en página para ver quien te presta</li>
                    <li className="mt-2">Trámites largos y complicados</li>
                    <li className="mt-2">Solicitud tradicional y expedientes físicos</li>
                    <li className="mt-2">No cuentan con todos los tipos de créditos en un mismo lugar</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4} md={5} sm={6} xs={8}>
            <Card id="card-credit" className="fondo-card-dp">
              <Card.Header id="header" style={{ height: '5rem' }}><img src={LOGODP} alt="LOGODP" width="100px" /></Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="text-dp fz12 white text-left ">
                  <ul className="dp-list">
                    <li className="dp-opciones">Con una sola solicitud te ofrecemos las mejores opciones de crédito acorde a las características
                      de tu negocio
                    </li>
                    <li className="dp-15min mt-2">Recibe las mejores opciones de crédito en menos de 15 minutos</li>
                    <li className="dp-linea mt-2">Solicitud 100% en línea</li>
                    <li className="dp-facil mt-2">Fácil y rápido, solo preocúpate por seguir creciendo tu negocio</li>
                  </ul>
                </Card.Text>
              </Card.Body>
              <Card.Footer id="footer">
                <Button className="text-center fz16 white nav-btn nav-btn-rad primary heigth-45 w-360 ml-auto mr-auto solicita-button coolvetica" style={{ textDecoration: "none" }} onClick={() => { history.push("/registrate") }}>
                  Solicita tu crédito
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreditOption