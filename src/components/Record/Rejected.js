import React from "react";
import CustomLoader from "../Generic/CustomLoader";
import CreditCard from "../Generic/CreditCard";
import { Col, Row } from "react-bootstrap";
import { reason, term } from "../../models/AmountModels";

const Rejected = (props) => {
  // Datos de prueba, que después tienen que obtenerse al hacer una petición
  const data = {
    clientCredits: [],
  };

  let info = () => {
    let credits = data.myAppliances;
    let cards = [];
    if (credits.length !== 0) {
      credits.map((value, index) => {
        let compo;
        if (
          value.status === false &&
          value.idAmount !== null &&
          value.idComercialInfo !== null &&
          value.idGeneralInfo !== null &&
          value.idDocuments !== null
        ) {
          compo = (
            <Col lg={6} sm={12} md={6}>
              <CreditCard
                date={value.idAmount.registerDate}
                amount={value.idAmount.howMuch}
                term={value.idAmount.term}
                reason={reason[value.idAmount.whyNeed]}
                whenNeed={term[value.idAmount.whenNeed]}
                rejected={value.reason}
                more={`rechazadas/${value.idAmount.idClient.appliance[index].id}`}
                key={index}
              />
            </Col>
          );
          cards.push(compo);
        }
        return "";
      });
      return (
        <div>
          {cards.length > 0 && (
            <div>
              <Row className="d-flex justify-content-left">{cards}</Row>
            </div>
          )}

          {cards.length === 0 && (
            <Col className="text-center mt-120 mb-120 fz17 brandonReg gray24">
              <div className="">Aún no tienes ninguna propuesta rechazada</div>
            </Col>
          )}
        </div>
      );
    } else {
      return (
        <Col className="text-center mt-120 mb-120 fz17 brandonReg gray24">
          <div className="">Aún no tienes ninguna propuesta rechazada</div>
        </Col>
      );
    }
  };

  return <div className="mt-50">{props.client && info()}</div>;
};

export default Rejected;
