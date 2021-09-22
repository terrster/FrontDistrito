import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


import LOGODP from '../../../assets/img/home/LOGO_DP_WHITE.png';

import '../../../css/creditoption.css';



const CreditOption = () => {

  const history = useHistory();

  
  return (
    <>
      <div id="creditoption" className="pt-4 text-center ml-auto mr-auto">

        <Title title="8 de cada 10 solicitudes recibe una opción de crédito" className="title-dp fz29  fw300" />

        <Title title="Existe una infinidad de opciones de crédito, pero solo una plataforma con todas esas opciones en una sola solicitud" className="subtitle-dp fz15 text-center mb-4 mt-4" />

        <Row className="d-inline-flex justify-content-center">
          <Col xl={4} md={5} sm={7}  className="d-flex justify-content-center mb-4">
            <Card className="fondo-card card-credit">
              <Card.Header id="header" style={{ height: '4rem' }} className="title-cards-dp fz29">Bancos y financieras</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="text-dp fz12  text-left">
                  <ul className="bancos-list">
                    <li>Tienes que ir de sucursal en sucursal o de página en página para ver quien te presta</li>
                    <li>Trámites largos y complicados</li>
                    <li>Solicitud tradicional y expedientes físicos</li>
                    <li>No cuentan con todos los tipos de créditos en un mismo lugar</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4} md={5} sm={6} sm={7} className="d-flex justify-content-center">
            <Card className="fondo-card-dp card-credit" style={{border: 'none'}}>
              <Card.Header id="header" style={{ height: '5rem' }}><img src={LOGODP} alt="LOGODP" width="150px" className="mt-4" /></Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="text-dp fz12 white text-left ">
                  <ul className="dp-list">
                    <li className="dp-opciones">Con una sola solicitud te ofrecemos las mejores opciones de crédito acorde a las características
                      de tu negocio
                    </li>
                    <li className="dp-15min">Recibe las mejores opciones de crédito en menos de 15 minutos</li>
                    <li className="dp-linea">Solicitud 100% en línea</li>
                    <li className="dp-facil">Fácil y rápido, solo preocúpate por seguir creciendo tu negocio</li>
                  </ul>
                </Card.Text>
                <Button id="btn-white" className="text-center fz16 blackNav nav-btn nav-btn-rad primary heigth-45 ml-auto mr-auto coolvetica" style={{ textDecoration: "none" }} onClick={() => { history.push("/registrate") }}>
                  Solicita tu crédito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreditOption
