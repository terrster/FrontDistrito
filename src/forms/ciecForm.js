import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import logito from "../assets/img/logo_dp/logodp-01.png";
import { Button } from "react-bootstrap";
import { validateCiec } from "../components/Validate/validateCiec";
import { renderField, renderFieldFull } from "../components/Generic/Fields";
import Popup from "./PopUp";
import "../css/ciec.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

let CiecForm = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, valid, popup, openModal, version, ciec, CiecStatus } =
    props;

  const [ciecState, setCiecState] = useState(ciec);
  const [validState, setValidState] = useState(" ");
  const [error, setError] = useState(false);

  useEffect(() => {
    setCiecState(ciec);
  }, [ciec]);

  useEffect(() => {
    if (ciecState === true) {
      setValidState("buscar un crédito personal");
    } else {
      setValidState("continuar con CIEC");
    }
  }, [ciecState]);

  const upper = (value) => value && value.toUpperCase();

  return (
    <div className="altForm">
      {popup && <Popup />}
      {!ciecState && <Popup />}
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
            maxLength={!ciecState ? 10 : 13}
            minLength={!ciecState ? 10 : 13}
            autoComplete="off"
          />
          {ciecState === true ? (
            <>
              <Field
                component={renderFieldFull}
                label="CIEC"
                name="ciec"
                autoComplete="off"
                err={error}
              />
              { error &&
              <span id={"CIEC-error"}>
                <small className="error extend-error">{"hola bb"}</small>
              </span>
              }   
            </>
          ) : null}
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
            {version
              ? version !== 0 && (
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
                )
              : null}
            <Col lg={6} xs={6}>
              <Button
                type="submit"
                className={"mt-20 mb-5 btn-blue-general"}
                style={{ width: "250px" }}
                form="ciecForm"
                // onClick={() => {console.log(valid)}}
              >
                continuar
              </Button>
            </Col>
          </Row>
          <div className="mt-3 text-muted" style={{ maxWidth: "80%" }}>
            <small>
              {ciecState === true
                ? "mi negocio no esta dado de alta en el SAT y no tengo CIEC, "
                : ""}
              <p
                style={{
                  color: "#007bff",
                  display: "inline",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  CiecStatus(!ciecState);
                }}
              >
                {validState}
              </p>
            </small>
          </div>
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
