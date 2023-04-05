import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import logito from "../assets/img/logo_dp/logodp-01.png";
import { Button } from "react-bootstrap";
import { validateCiec } from "../components/Validate/validateCiec";
import { renderField, renderFieldFull } from "../components/Generic/Fields";
import Popup from "./PopUp";
import "../css/ciec.css";

import { text } from "@fortawesome/fontawesome-svg-core";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

let CiecForm = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, valid, popup, openModal, version } = props;

  const [rfc, setRfc] = useState("");
  const [rfcState, setRfcState] = useState("");
  const [inicio, setInicio] = useState(false);

  const upper = (value) => value && value.toUpperCase();

  return (
    <div className="altForm">
      {popup && <Popup />}
      <form onSubmit={handleSubmit} autoComplete="off" id="ciecForm">
        <img
          className="mb-4 img-fluid"
          src={logito}
          alt="LogoPyme"
          style={{ width: "20%" }}
        ></img>
        <div
          className="text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Field
            component={renderField}
            label={"RFC"}
            name="rfc"
            cls="mb-3"
            normalize={upper}
            maxLength={12}
            minLength={12}
            autoComplete="off"
          />
          <Field
            component={renderFieldFull}
            label="CIEC"
            name="ciec"
            autoComplete="off"
          />
        </div>
        <input
          type="text"
          autoComplete="on"
          value=""
          style={{
            display: "none",
            opacity: 0,
            position: "absolute",
            left: "-100000px",
          }}
          readOnly={true}
        />
        <div className="mt-3 text-center d-flex justify-content-center align-items-center flex-column">
          <Row className="mt-3 flex-column">
            {version ? version !== 0 && (
              <Col lg={6} xs={6}>
                <Button
                  type="button"
                  className={"mt-20 mb-3 btn-blue-general"}
                  style={{ width: "250px" }}
                  onClick={() => {
                    openModal();
                  }}
                >
                  saber más
                </Button>
              </Col>
            ) : null
          
          }
            <Col lg={6} xs={6}>
              <Button
                type="submit"
                className={"mt-20 btn-blue-general"}
                style={{ width: "250px" }}
                form="ciecForm"
                // onClick={() => {console.log(valid)}}
              >
                continuar
              </Button>
            </Col>
          </Row>
          <p className="mt-3 text-muted" style={{ maxWidth: "80%" }}>
            <small>
              al seleccionar "continuar", usted acepta nuestros{" "}
              <a href="https://distritopyme.com/terminos-y-condiciones">
                términos de uso
              </a>{" "}
              y{" "}
              <a href="https://distritopyme.com/privacidad">
                aviso de privacidad.
              </a>
            </small>
          </p>
        </div>
      </form>
    </div>
  );
};

CiecForm = reduxForm({
  form: "ciecForm",
  validate: validateCiec,
  enableReinitialize: true,
})(CiecForm);

export default CiecForm;
