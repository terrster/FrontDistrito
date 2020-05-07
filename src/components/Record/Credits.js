import React from "react";
import CustomLoader from "../Generic/CustomLoader";
import CreditCard from "../Generic/CreditCard";
import { Col, Row } from "react-bootstrap";
import { reason, term } from "../../models/AmountModels";
import Title from "../Generic/Title";

const Credits = (props) => {

	// Datos de prueba, que después tienen que obtenerse al hacer una petición
	const data = {
		clientCredits: []
	}

    let info = () => {
    let credits = data.clientCredits;
    if (credits.length !== 0) {
      let cards = credits.map((value, index) => (
        <Col lg={6} sm={12} md={6}>
          <CreditCard
            date={value.date}
            amount={value.amount}
            term={value.term}
            expiresDate={value.expiresDate}
            reason={reason[value.reason]}
            whenNeed={term[value.whenNeed]}
            key={index}
          />
        </Col>
      ));
      return (
        <div>
          <div className="mb-50 text-center">
            <Title
              title="¡Tenemos buenas noticias!"
              className="coolvetica fz48 blackBlue"
            />
            <div className="brandonLight fz20">
              Tu crédito fue aprobado y empezaremos el proceso de formalización.
            </div>
            <div className="brandonLight fz20">
              Gracias por conﬁar en nosotros.
            </div>
          </div>

          <Row className="d-flex justify-content-left">{cards}</Row>
        </div>
      );
    } else {
      return (
        <Col className="text-center mt-120 mb-120 fz17 brandonReg gray24">
          <div className="">Aún no tienes ningun credito aprobado</div>
        </Col>
      );
    }
  };

  return <div className="mt-50">{props.client && info()}</div>;
};

export default Credits;
