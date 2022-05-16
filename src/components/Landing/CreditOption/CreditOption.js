import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LOGODP from '../../../assets/img/home/logodp.svg';
import '../../../css/creditoption.css';



const CreditOption = (props) => {

  const history = useHistory();
  
  return (
    <>
      <div id="creditOption" className={`${props.estado === 0 ? 'pt-4 mb-21 pb-120 background' : 'mt-5 mb-3'} text-center ml-auto mr-auto`}>

        <Row className="d-inline-flex justify-content-center w-100">
         <Col xl={3} lg={3} md={5} sm={12} className="d-flex justify-content-center">
            <Card className="fondo-card-white left-content">
              <Card.Header id="header"  className="title-dp fz32  fw300 text-left line-height"><span className='title-dp-coral'>8 </span>de cada 10 solicitudes recibe una opción de crédito</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className={`${props.estado === 0 ? 'text-left' : 'text-center'} text-dp fz14 `}>
                  <p className="bancos-list">
                  existe una infinidad de opciones de
                  crédito, pero solo una plataforma
                  con todas esas opciones en una 
                  sola solicitud
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4} lg={4} md={5} sm={12}  className="d-flex justify-content-center">
            <Card className="fondo-card card-credit">
              <Card.Header id="header" className="title-cards-dp">bancos y financieras</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="text-dp-gray fz12  text-left">
                  <ul className="bancos-list">
                    <li>tienes que ir de sucursal en sucursal o de página en página para ver quien te presta</li>
                    <li>trámites largos y complicados</li>
                    <li>solicitud tradicional y expedientes físicos</li>
                    <li>no cuentan con todos los tipos de créditos en un mismo lugar</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4} lg={4} md={5} sm={12} className="d-flex justify-content-center">
            <Card className="fondo-card-dp card-credit" style={{border: 'none'}}>
              <Card.Header id="header" style={{ height: '5rem' }}><img src={LOGODP} alt="LOGODP" width="120rem" className="mt-4" /></Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="text-dp fz12 white text-left ">
                  <ul className="dp-list">
                    <li>con una sola solicitud te ofrecemos las mejores opciones de crédito acorde a las características
                      de tu negocio
                    </li>
                    <li>recibe las mejores opciones de crédito en menos de 15 minutos</li>
                    <li>solicitud 100% en línea</li>
                    <li className="dp-facil">fácil y rápido, solo preocúpate por seguir creciendo tu negocio</li>
                  </ul>
                </Card.Text>
                
                {/* <Button id="btn-white" className="text-center fz16 blackNav nav-btn nav-btn-rad primary heigth-45 ml-auto mr-auto coolvetica" style={{ textDecoration: "none" }} onClick={() => { history.push("/registrate") }}>
                  Solicita tu crédito
                </Button> */}

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreditOption
