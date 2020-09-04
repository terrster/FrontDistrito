import React, { useState } from "react";
import { Field, reduxForm, formValueSelector  } from "redux-form";
import { connect } from "react-redux";
import { Button, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "../css/signup.css";
import { validateSignup } from "../components/Validate/ValidateSignup";
import ReCAPTCHA from "react-google-recaptcha";
import scroll from "../utils/scroll";

const renderField = ({
  input,
  label,
  type,
  maxLength,
  minLength,
  meta: { touched, error, warning },
  errorEmail,
  errorBroker
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
	{type === "email" && <span> <small className="error" id={input.name + "-error"}>{errorEmail}</small> </span>}
  {type === "text" && errorBroker != '' && <span> <small className="error" id={input.name + "-error"}>{errorBroker}</small> </span>}
    {touched &&
      ((error && (
        <span>
          <small className="error" id={input.name + "-error"} >{error}</small>
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
  const { handleSubmit, submitting, errorEmail, setErrorEmail, errorBroker, setErrorBroker, valid } = props;

  const [button, setButton] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const onChange = value => {setButton(!value)};
  const onlyLirycs = (nextValue, previousValue) => /^([a-z ñáéíóú]{0,60})$/i.test(nextValue) ? nextValue : previousValue;
  const onlyNumbers = (nextValue, previousValue) => /^\d+$/.test(nextValue) || nextValue.length === 0? nextValue : previousValue;
  const sanitizeString = e => { e.preventDefault(); props.change(e.target.name, e.target.value.trim()) };

  const goToError = () => {
		const nameError = document.getElementById("name-error");
		const lastnameError = document.getElementById("lastname-error");
		const emailError = document.getElementById("email-error");
		const emailConfirmError = document.getElementById("email_confirm-error");
		const phoneError = document.getElementById("phone-error");
    const passwordError = document.getElementById("password-error");
    const brokercodeError = document.getElementById("brokercode-error");
		const errors = [nameError, lastnameError, emailError, emailConfirmError, phoneError, passwordError, brokercodeError];
		for (let x = 0; x < errors.length; x++) {
      if (errors[x] != null) {
        scroll(errors[x].id);
        break;
      }
    }
	}

  if (disabled && valid){
		setDisabled(false);
	}
	if (!disabled && !valid){
		setDisabled(true);
	}

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
          onBlur={ e => { sanitizeString(e) } }
        />

        <Field
          component={renderField}
          type="text"
          name="lastname"
          label="Apellido Paterno"
          normalize={onlyLirycs}
          onBlur={ e => { sanitizeString(e) } }
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
          onBlur={ e => { sanitizeString(e) } }
        />
        <Field
          component={renderField}
          type="email"
          name="email_confirm"
          label="Confirmar correo electrónico"      
          onBlur={ e => { sanitizeString(e) } }    
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
        <Row>
          <Col lg={8} md={8} sm={8}>
            <Field
              component={renderField}
              type="text"
              name="brokercode"
              label="Código brokers"
              onChange={ (event, newValue, previousValue, name) => {
                setErrorBroker("");
              }}
              errorBroker={errorBroker}
              normalize={onlyNumbers}
              onBlur={ e => { sanitizeString(e) } }
            />
          </Col>
          <Col lg={4} md={4} sm={4}>
            <NavLink to="/registrate">
              <Button type="button" className={"btn-blue-brokers"}>
                No eres Broker, clic aquí
              </Button>
            </NavLink>
          </Col>
        </Row>
        
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6LcTuPEUAAAAAF4wO3suJh3zugOr5pO-daAE-Puc"
            onChange={onChange}
          />
        </div>
        <div className="mt-30 text-dp fw300 fz20 text-center mb-10">
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
        {
					!disabled && !button ? (
						<Button
							type="submit"
							className={"mt-50 btn-blue-general"}
						>
							Continuar
						</Button>
					) : (
						<Button 
							type="button"
							className="mt-50 btn-blue-general btn-gray-general"
							onClick={() => goToError()}
						>
							Continuar
						</Button>
					)
				}
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
