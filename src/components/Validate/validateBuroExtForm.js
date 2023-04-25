export const validateBuroExtForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Ingresa tu nombre";
  } else if (!/^[A-Za-záéíóúñ\s]+$/g.test(values.name)) {
    errors.name = "Nombre inválido";
  }

  if (!values.lastname) {
    errors.lastname = "Ingresa tu apellido paterno";
  } else if (!/^([a-zñáéíóúü\s]{0,60})$/i.test(values.lastname)) {
    errors.lastname = "Apellido inválido";
  }

  if (!values.secondLastname) {
    errors.secondLastname = "Ingresa tu apellido materno";
  } else if (!/^([a-zñáéíóúü\s]{0,60})$/i.test(values.secondLastname)) {
    errors.secondLastname = "Apellido inválido";
  }

  if (!values.rfcPerson) {
    errors.rfcPerson = "Ingresa tu RFC Personal";
  } else {
    if (!/^[A-Z]{4}(\d{6})([A-Z|\d]{3})$/.test(values.rfcPerson)) {
      errors.rfcPerson = "Ingresa un RFC válido";
    }
  }

  if (!values.email) {
    errors.email = "Ingresa tu correo electrónico";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  if (!values.civilStatus || values.civilStatus === "Selecciona...") {
    errors.civilStatus = "Estado civil...";
  }

  if (!values.curp) {
    errors.curp = "Ingresa tu CURP";
  } else if (
    !/^[A-Z]{4}(\d{6})([A-Z|\d]{8})$/.test(values.curp) ||
    values.curp.length > 18 ||
    values.curp.length < 18
  ) {
    errors.curp = "Ingresa un CURP válido";
  }

  if (!values.mortgageCredit) {
    errors.mortgageCredit = "Selecciona una opción";
  }

  if (!values.carCredit) {
    errors.carCredit = "Selecciona una opción";
  }

  if (!values.creditCard) {
    errors.creditCard = "Selecciona una opción";
  }
  if (values.creditCard === 1 && !values.last4) {
    errors.last4 = "Ingresa los números de tu tarjeta";
  } else if (!/^[0-9]{3}\d$/.test(values.last4)) {
    errors.last4 = "Ingresa un número válido";
  }

  if (!values.street) {
    errors.street = "Ingresa la calle de tu domicilio";
  } else if (values.street.length > 40) {
    errors.street = "Ingresa solamente la calle de tu domicilio";
  }

  if (!values.extNumber) {
    errors.extNumber = "Ingresa el número exterior de tu domicilio";
  } else if (!/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(values.extNumber)) {
    errors.extNumber = "Ingresa un número exterior valido";
  }

  if (
    values.intNumber !== "" &&
    !/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(values.intNumber)
  ) {
    errors.intNumber = "Ingresa un número interior valido";
  }

  if (!values.town) {
    errors.town = "Ingresa la colonia donde se ubica tu domicilio";
  }

  if (!values.phone) {
    errors.phone = "Ingresa un número de teléfono";
  } else if (
    !/^[0-9]\d+$/.test(values.phone) ||
    values.phone.length > 10 ||
    values.phone.length < 10
  ) {
    errors.phone = "Ingresa un número de teléfono válido";
  }

  if (!values.zipCode) {
    errors.zipCode = "Ingresar código postal";
  } else if (
    !/^[0-9]\d{4,5}/.test(values.zipCode) ||
    values.zipCode.length > 5 ||
    values.zipCode.length < 5
  ) {
    errors.zipCode = "Ingresa un código postal valido";
  }

  if (!values.tyc) {
    errors.tyc = "Debes aceptar para avanzar";
  }

  if(!values.ocuppation){
    errors.ocuppation = "Por favor ingresar ocupación"
  }

  return errors;
};
