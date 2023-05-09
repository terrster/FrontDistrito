import * as $ from "jquery";
import { RFCValido, metaRFC } from "./validateRFC";
const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i;
const isName = /^([a-z ñáéíóú]{2,60})$/i;
const isNumber = /^\d*$/;
export const validateSignup = values => {
  const errors = {};

  if (!values.rfc) {
    errors.rfc = "Ingresa tu RFC";
  } else if (!RFCValido(values.rfc)) {
    errors.rfc = metaRFC(values.rfc).msg;
  }

  if (!values.email) {
    errors.email = "Ingresa un correo";
  } else if (!isValidEmail.test(values.email)) {
    errors.email = "Ingresa un correo válido";
  } else {
    $("#ymb-dp-signup-email-used").addClass("d-none");
  }

  if (!values.email_confirm) {
    errors.email_confirm = "Repite tu correo electrónico";
  } else if (values.email !== values.email_confirm) {
    errors.email_confirm = "Los correos electrónicos no coinciden";
  }

  if (!values.phone) {
    errors.phone = "Ingresa tu número telefónico";
  } else if(!(isNumber.test(values.phone))){
    errors.phone = "Sólo se pueden ingresar números"
  }else if (values.phone.length < 10) {
    errors.phone = "Ingresa un número telefónico de 10 dígitos";
  }

  if (!values.password) {
    errors.password = "Ingresa una contraseña";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (values.registered === true) {
    errors.email = "Correo ya registrado";
  }

  if(!values.brokercode){
    errors.brokercode = "Ingresa tú código broker";
  }

  return errors;
};