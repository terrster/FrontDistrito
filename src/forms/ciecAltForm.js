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

let CiecAltForm = (props) => {
  const dispatch = useDispatch();
  const { initialValues, handleSubmit } = props;

  const [validState, setValidState] = useState(" ");
  const [error, setError] = useState(false);
  const [changeRFC, setChangeRFC] = useState(true);

  const upper = (value) => value && value.toUpperCase();

  return (
    
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" id="ciecForm" className="form_shadow">
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
            maxLength={ 13}
            minLength={ 12}
            autoComplete="off"
          />
          {/* <div className="text-center">
          <input
              type="checkbox"
              style={{ width: "15px", height: "15px", marginTop: "5px" }}
              onChange={() => {
                setChangeRFC(!changeRFC);
              }}
            />
          <label className="text-muted ml-2">
            <small>deseo modificar el RFC</small>
          </label>
          </div> */}
          
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
          
        </div>
        <input
          type="password"
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
        </div>
        <div className="mt-3 text-center d-flex justify-content-center align-items-center flex-column">

        </div>
      </form>
    </div>
  );
};

CiecAltForm = reduxForm({
  form: "ciecForm",
  validate: validateCiec,
  enableReinitialize: true,
})(CiecAltForm);

export default CiecAltForm;
