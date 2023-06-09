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
  name,
  input,
  label,
  type,
  maxLength,
  minLength,
  meta: { touched, error, warning },
  errorEmail,
  errorBroker,
  readOnly,
  style
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
          readOnly={readOnly}
          style={style}
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
	{name === "email" && <span> <small className="error" id={input.name + "-error"}>{errorEmail}</small> </span>}
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
    crea tu contraseña para regresar más tarde
  </Tooltip>
);

let SignupFormBrokers = (props) => {
  const { handleSubmit, submitting, errorEmail, setErrorEmail, errorBroker, setErrorBroker, valid, ownerId } = props;

  const [button, setButton] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const onChange = value => {setButton(!value)};
  const onlyLirycs = (nextValue, previousValue) => /^$|^([^\s]*[A-Za-zñáéíóú]\s{0,1})*[^\s]*$/i.test(nextValue) ? nextValue : previousValue;
  const onlyLirycsWithOnlyOneSpaceBetween = (nextValue, previousValue) => /^$|^([^\s]*[A-Za-zñáéíóú]\s{0,1})[^\s]*$/i.test(nextValue) ? nextValue : previousValue;
  // const onlyLirycsWithAnySpace = (nextValue, previousValue) => /^([A-Za-zñáéíóú]{0,30}$)/i.test(nextValue) ? nextValue : previousValue;
  const onlyNumbers = (nextValue, previousValue) => /^\d+$/.test(nextValue) || nextValue.length === 0 ? nextValue : previousValue;
  const validateEmail = (nextValue, previousValue) => /^$|^[^\s]*[\w-\.\@]+$/i.test(nextValue) ? nextValue : previousValue;
	const validatePassword = (nextValue, previousValue) => /^[^\s]*$/i.test(nextValue) ? nextValue : previousValue;

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
          maxLength={60}
          normalize={onlyLirycsWithOnlyOneSpaceBetween}
          onChange={ (event, newValue, previousValue, name) => {
            if(errorBroker !== ''){
              setErrorBroker("");
            }
          }}
        />

        <Field
          component={renderField}
          type="text"
          name="lastname"
          label="Apellido Paterno"
          normalize={onlyLirycs}
          onBlur={(e) => {
            e.preventDefault(); 
            props.change('lastname', e.target.value.trim());
          }}
          onChange={ (event, newValue, previousValue, name) => {
            if(errorBroker !== ''){
              setErrorBroker("");
            }
          }}
        />
        <Field
          component={renderField}
          type="text"
          onChange={ (event, newValue, previousValue, name) => {
            setErrorEmail("");
            if(errorBroker !== ''){
              setErrorBroker("");}
          }}
          name="email"
          label="Correo electrónico"
          errorEmail={errorEmail}
          normalize={validateEmail}
        />
        {
          errorEmail &&
          <span><small className="error" id={"email-error"}>{errorEmail}</small></span>
        }
        <Field
          component={renderField}
          type="text"
          name="email_confirm"
          label="Confirmar correo electrónico"
          normalize={validateEmail}
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
            onChange={ (event, newValue, previousValue, name) => {
              if(errorBroker !== ''){
                setErrorBroker("");
              }
            }}
          />
        </div>
        <OverlayTrigger
          placement="top"
          trigger="focus"
          overlay={passwordTooltip}
        >
          <Field
            component={renderField}
            type="text"
            name="password"
            label="Crea una contraseña"
            normalize={validatePassword}
          />
        </OverlayTrigger>
        {
          ownerId ? 
          (<div>
            <label className="label-style mt-24">
              broker id
            </label>
            <Field
              component={renderField}
              type="text"
              name="brokercode"
              label="broker id"
              readOnly={true}
              errorBroker={errorBroker}
              style={{marginTop: '0px'}}
            />
          </div>) :
          (
          <Row>
            <Col lg={8} md={8} sm={8}>
              <Field
                component={renderField}
                type="text"
                name="brokercode"
                label="broker id"
                onChange={ (event, newValue, previousValue, name) => {
                  setErrorBroker("");
                }}
                errorBroker={errorBroker}
                normalize={onlyNumbers}
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
          )
        }
        
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6Ld2huQZAAAAANpPc8zQKPnS948P7vzt2T7t-GCF"
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
              style={{ width: '250px' }}
						>
							continuar
						</Button>
					) : (
						<Button 
							type="submit"
              className="mt-50 btn-blue-general btn-gray-general"
              style={{ width: '250px' }}
							onClick={() => goToError()}
						>
							continuar
						</Button>
					)
				}
        </div>
      </form>
    </div>
  );
};

const selector = formValueSelector("signupFormBrokers");

SignupFormBrokers = connect(state => {
  const email = selector(state, "email");
  return {
    email
  };
})(SignupFormBrokers);

SignupFormBrokers = reduxForm({
  form: 'signupFormBrokers',
  validate: validateSignup,
  enableReinitialize: true,
})(SignupFormBrokers);

export default SignupFormBrokers;
