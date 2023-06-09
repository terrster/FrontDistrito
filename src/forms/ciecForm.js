import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import logito from "../assets/img/logo_dp/logodp-01.png";
import { Button } from "react-bootstrap";
import { validateCiec } from "../components/Validate/validateCiec";
import { renderField, renderFieldFull } from "../components/Generic/Fields";
import "../css/ciec.css";

import { text } from "@fortawesome/fontawesome-svg-core";

let CiecForm = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, valid } = props;

  const [rfc, setRfc] = useState("");
  const [rfcState, setRfcState] = useState("");
  const [inicio, setInicio] = useState(false);

  const upper = (value) => value && value.toUpperCase();

  return (
    <div className="form-ciec">
      <form onSubmit={handleSubmit} autoComplete="off" id="ciecForm">
        <img
          className="mb-4 img-fluid"
          src={logito}
          alt="LogoPyme"
          style={{ width: "50%" }}
        ></img>
        <Field
          component={renderField}
          label={"RFC"}
          name="rfc"
          cls="mb-3"
          normalize={upper}
          maxLength={12}
          minLength={12}
        />
        <Field component={renderFieldFull} label="CIEC" name="ciec" />
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
        <div className="text-center d-flex justify-content-center">
          <p className="mt-30 text-muted" style={{ maxWidth: "80%" }}>
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
        <Button
          type="submit"
          className={"mt-20 btn-blue-general"}
          style={{ width: "250px" }}
          form="ciecForm"
          // onClick={() => {console.log(valid)}}
        >
          continuar
        </Button>
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
