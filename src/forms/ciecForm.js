import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import logito from '../assets/img/logo_dp/logodp-01.png'
import { Button } from "react-bootstrap";
import { validateCiec } from "../components/Validate/validateCiec";
import {
  renderField,
  renderFieldFull,
} from "../components/Generic/Fields";
import '../css/ciec.css'
import { text } from "@fortawesome/fontawesome-svg-core";


let CiecForm = (props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    valid
  } = props;

    const [rfc, setRfc] = useState("");
    const [rfcState, setRfcState] = useState("");
    const [inicio , setInicio] = useState(false);

  const upper = (value) => value && value.toUpperCase();
    
    return(
        <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4 img-fluid" src={logito} alt='LogoPyme'style={{width:'50%'}} ></img>
                    <Field
                    component={renderField}
                    label={'RFC'}
                    name="rfc"
                    cls="mb-3"
                    normalize={upper}
                    maxLength={12}
                    minLength={12}
                    />
                    <Field component={renderFieldFull} label="CIEC" name="ciec" />
                    <p className="mt-1 mb-1 text-muted"><small>Al seleccionar "enviar", usted acepta nuestros <a href='https://distritopyme.com/terminos-y-condiciones'>términos de uso</a> y <a href='https://distritopyme.com/privacidad'>aviso de privacidad.</a></small></p>
                    <Button type="submit" className={"mt-50 btn-blue-general"} style={{ width: '250px' }}>
                    Continuar
                    </Button>
                </form>
        </div>
    )
        
    }

CiecForm = reduxForm({
        form: "ciecForm",
        validate: validateCiec,
        enableReinitialize: true,
    })(CiecForm);

export default CiecForm;