const RFCPF = /^([A-ZÑ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))(([-|\s])?([A-Z\d]{3}))?$/;
const RFCPM = /^([A-ZÑ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))(([-|\s])?([A-Z\d]{3}))?$/;
const OTHER = /^[A-Z]{4}(\d{6})((\D|\d){3})?$/;
const broker = sessionStorage.getItem('broker');

function validDay(day, month) {
  let valid = true;
  const intMonth = parseInt(month);
  const intDay = parseInt(day);
  if (intMonth === 2 && intDay > 29) {
    valid = false;
  }
  return valid;
}

export const validateComercialInfo = (values) => {
  let errors = {};
  const user = JSON.parse(sessionStorage.getItem("user"));
  const idClient = user.idClient;
  const type = idClient.type;

  // if (!values.zipCode) {
  //   errors.zipCode = "Ingresar código postal";
  // } else {
  //   if (values.zipCode.length < 5) {
  //     errors.zipCode = "Código postal inválido";
  //   }
  // }
  // if (!values.town) {
  //   errors.town = "Seleccione una colonia";
  // }

  if (!values.comercialName) {
    errors.comercialName = "Ingresa el nombre de tu negocio";
  }
  if (!values.businessName && type === "PM") {
    errors.businessName = "Ingresa la razón social de tu negocio";
  }
  if (!values.gyre) {
    errors.gyre = "Selecciona el giro de tu negocio";
  }

  if (!values.specific) {
    errors.specific = "Escribe la actividad específica de tu negocio";
  }

  if (!values.rfc) {
    errors.rfc = "Ingresa el RFC";
  } else {
    if (type === "PF") {
      const day = values.rfc.substring(8, 10);
      const month = values.rfc.substring(6, 8);
      if (!validDay(day, month)) {
        errors.rfc = "Ingresa un RFC válido";
      } else if (!RFCPF.test(values.rfc)) {
        errors.rfc = "Ingresa un RFC válido";
      }
    } else if (type === "PM") {
      const day = values.rfc.substring(7, 9);
      const month = values.rfc.substring(5, 7);
      if (!validDay(day, month)) {
        errors.rfc = "Ingresa un RFC válido";
      } else if (!RFCPM.test(values.rfc)) {
        errors.rfc = "Ingresa un RFC válido";
      }
    } else {
      if (!OTHER.test(values.rfc)) {
        errors.rfc = "Ingresa un RFC válido";
      }
    }
  }

  if(!values.employeesNumber){
    errors.employeesNumber = "Selecciona una opción";
  }

  if (type === "PM") {
    if(!values.bankAccount){
      errors.bankAccount = "Selecciona una opción";
    }
  }

  if (type === "PM" || type === "PFAE") {
    if(!values.empresarialCreditCard){
      errors.empresarialCreditCard = "Selecciona una opción";
    }
  }

  if (type !== "PF") {
    if(!values.paymentsMoreThan30){
      errors.paymentsMoreThan30 = "Selecciona una opción";
    }
  }

  if (!values.street) {
    errors.street = "Ingresa la calle de tu negocio";
  }
  else if(values.street.length > 40){
    errors.street = "Ingresa solamente la calle de tu negocio";
  }

  if (!values.extNumber) {
    errors.extNumber = "Ingresa el número exterior de tu negocio";
  }
  else if(!/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(values.extNumber)){
    errors.extNumber = "Ingresa un número exterior valido";
  }

  if(values.intNumber !== '' && !/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(values.intNumber)){
    errors.intNumber = "Ingresa un número interior valido";
  }

  // if (!values.town) {
  //   errors.town = "Ingresa la colonia donde se ubica tu negocio";
  // }

  // for(let i=0; i<=10; i++){
  //   if(!values['username'+i]){
  //     errors['username'+i] = "Ingresa el usuario/número de tarjeta o cuenta de tu banco";
  //   }
  //   if(!values['password'+i]){
  //     errors['password'+i] = "Ingresa la contraseña de tu banco";
  //   }
  //   if(!values['securityCode'+i]){
  //     errors['securityCode'+i] = "Ingresa el token/clave de seguridad de tu banco";
  //   }
  // }

  if (!values.phone) {
    errors.phone = "Ingresa el teléfono de tu negocio";
  } else if (
    !/^[0-9]\d+$/.test(values.phone) ||
    values.phone.length > 10 ||
    values.phone.length < 10
  ) {
    errors.phone = "Ingresa un teléfono válido";
  }
  if (values.phone === broker && broker !== "") {
    errors.phone = "EL numero no pude ser el del broker";
  }

  if (!values.warranty) {
    errors.warranty = "Selecciona una opción";
  }

  if (!values.terminal) {
    errors.terminal = "Selecciona una opción";
  }

  if (!values.exportation) {
    errors.exportation = "Selecciona una opción";
  }

  if (type !== "PF") {
    if (!values.ciec) {
      errors.ciec = "";
    } else if (!/^[a-zA-Z0-9]+$/.test(values.ciec) || values.ciec.length < 8) {
      errors.ciec = "Ingresa una CIEC válida";
    }
  }

  return errors;
};
