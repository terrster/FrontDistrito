import React from 'react';
import Title from '../../Generic/Title';
import { Row, Col, Card} from 'react-bootstrap';

import Icons from '../../Landing/Icons/Icons';
import FIRMA from '../../../assets/img/brokers-landing/iconos/firma.png';
import LOGODP from '../../../assets/img/logo_dp/extras-03.png';



const CreditOption = () => {
  return(
    <>
      <div id="creditoption" className="pt-4 text-center ml-auto mr-auto">
        <Title title="Hoy en día existe una infinidad de opciones de créditos para tu empresa o negocio pero solo una plataforma
        que contiene todas esas opciones en una sola solicitud en menos de 15 minutos" className="title-dp fz29  fw300 ls-01" />

        <Title title="8 De Cada 10 Solicitudes Recibe Una Opción De Crédito" className="subtitle-dp fw200 mt-2 fz25" />

        <Row className="justify-content-center mt-3">
          <Col xl={3} md={6} sm={6} className="mb-4">
            <Card id="card-home" style={{ height: '28rem' }}>
              <Icons img={FIRMA} alt="Firma" width="100px" />
              <Card.Body>
                <Card.Title>Bancos, financieras y fintechs</Card.Title>
                <Card.Text className="metropolisReg fz12 blackBlue text-left">
                  <ul>
                    <li>Tienes que ir de sucursal en sucursal o de página en página para ver quien te presta</li>
                    <li className="mt-2">Trámites largos y complicados</li>
                    <li className="mt-2">Solicitud tradicional y expedientes físicos</li>
                    <li className="mt-2">No cuentan con todos los tipos de créditos en un mismo lugar</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} md={6} sm={6} className="mb-4">
            <Card id="card-home" style={{ height: '28rem' }}>
              <Icons img={LOGODP} alt="lOGO" width="140px" />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className="metropolisReg fz12 blackBlue text-left">
                  <ul>
                    <li>Con una sola solicitud te ofrecemos las mejores opciones de crédito acorde a las características
                      de tu negocio
                    </li>
                    <li className="mt-2">Recibe las mejores opciones de crédito en menos de 15 minutos</li>
                    <li className="mt-2">Solicitud 100% en línea</li>
                    <li className="mt-2">Fácil y rápido, solo preocúpate por seguir creciendo tu negocio</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreditOption