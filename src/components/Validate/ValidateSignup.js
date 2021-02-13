import * as $ from "jquery";
const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const isName = /^([a-z ñáéíóú]{2,60})$/i;
const isNumber = /^\d*$/;
export const validateSignup = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Ingresa tu nombre";
  } else if (values.name.length < 2) {
    errors.name = "El nombre es muy corto";
  } 
  else if (!isName.test(values.name)) {
    errors.name = "El nombre sólo puede contener caracteres de la A a la Z";
  }

  if (!values.lastname) {
    errors.lastname = "Ingresa tu apellido";
  } else if (values.lastname.length < 2) {
    errors.lastname = "El apellido es muy corto";
  } else if (!isName.test(values.lastname)) {
    errors.lastname =
      "El apellido sólo puede contener caracteres de la A a la Z";
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