import React, { useState } from "react";
import { Field, reduxForm, formValueSelector  } from "redux-form";
import { connect } from "react-redux";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "../css/signup.css";
import { validateSignup } from "../components/Validate/ValidateSignup";
import ReCAPTCHA from "react-google-recaptcha";


const renderField = ({
  input,
  label,
  type,
  maxLength,
  minLength,
  meta: { touched, error, warning },
  errorEmail
}) => (
  <div>
    {label !== "Teléfono" ? (
      <div className="input-container">
        <input
          className="form-control custom-form-input text-dp mt-24"
          {...input}
          placeholder={label}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
    ) : (
      <div className="input-container">
        <input
          className="form-control custom-form-input text-dp"
          {...input}
          placeholder={label}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
    )}
	{type === "email" && <span> <small className="error">{errorEmail}</small> </span>}
    {touched &&
      ((error && (
        <span>
          <small className="error">{error}</small>
        </span>
      )) ||
        (warning && <span>{warning}</span>))}
  </div>
);

const passwordTooltip = (
  <Tooltip className="tooltip-password">
    Crea tu contraseña para regresar más tarde
  </Tooltip>
);

let SignupForm = (props) => {
  const { handleSubmit, submitting, errorEmail, setErrorEmail } = props;
  const submitButtonClass = submitting
    ? "btn-blue-general mt-30 disabled"
    : "btn-blue-general mt-30";
  const [button, setButton] = useState(true);
  const onChange = value => {setButton(!value)};
  const onlyLirycs = (nextValue, previousValue) => /^([a-z ñáéíóú]{0,60})$/i.test(nextValue) ? nextValue : previousValue;
  const onlyNumbers = (nextValue, previousValue) => /^\d+$/.test(nextValue) || nextValue.length === 0? nextValue : previousValue;
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="mr-auto ml-auto"
        style={{ maxWidth: "690px" }}
      >
        <Field
          component={renderField}
          type="text"
          name="name"
          label="Nombre(s)"
          normalize={onlyLirycs}
        />

        <Field
          component={renderField}
          type="text"
          name="lastName"
          label="Apellido Paterno"
          normalize={onlyLirycs}
        />
        <Field
          component={renderField}
          type="text"
          name="secondLastName"
          label="Apellido Materno"
          normalize={onlyLirycs}
        />
        <Field
          component={renderField}
          type="email"
          onChange={ (event, newValue, previousValue, name) => {
			  setErrorEmail("");
	      }}
          name="email"
          label="Correo electrónico"
          errorEmail={errorEmail}
        />
        <Field
          component={renderField}
          type="email"
          name="email_confirm"
          label="Confirmar correo electrónico"          
        />
        <span>
          <small id="ymb-dp-signup-email-confirm" className="d-none error">
            Los correos no son iguales
          </small>
        </span>
        <span>
          <small id="ymb-dp-signup-email-used" className="d-none error">
            Correo ya registrado
          </small>
        </span>
        <div>
          <label className="label-style mt-24">
            El número telefónico debe tener 10 dígitos
          </label>
          <Field
            component={renderField}
            type="text"
            name="phone"
            label="Teléfono"
            maxLength={10}
            normalize={onlyNumbers}
          />
        </div>
        <OverlayTrigger
          placement="top"
          trigger="focus"
          overlay={passwordTooltip}
        >
          <Field
            component={renderField}
            type="password"
            name="password"
            label="Crea una contraseña"
          />
        </OverlayTrigger>
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6LcTuPEUAAAAAF4wO3suJh3zugOr5pO-daAE-Puc"
            onChange={onChange}
          />
        </div>
        <div className="mt-30 brandonReg fw300 fz20 text-center mb-10">
          <label className="fz15">
            Al continuar estás aceptando nuestros{" "}
            <a
              href="/terminos-y-condiciones"
              target="blank"
              style={{ color: "#000000" }}
            >
              términos y condiciones de uso
            </a>{" "}
            <br />y nuestro{" "}
            <a href="/privacidad" target="blank" style={{ color: "#000000" }}>
              aviso de privacidad
            </a>
          </label>
        </div>
        <div className="text-center mb-5">
          <Button type="submit" className={submitButtonClass} disabled={button}>
            CONTINUAR
          </Button>
        </div>
      </form>
    </div>
  );
};

const selector = formValueSelector("signupForm");

SignupForm = connect(state => {
  const email = selector(state, "email");
  return {
    email
  };
})(SignupForm);

SignupForm = reduxForm({
  form: 'signupForm',
  validate: validateSignup 
})(SignupForm);

export default SignupForm;
