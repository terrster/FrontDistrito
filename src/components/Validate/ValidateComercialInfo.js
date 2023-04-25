const broker = sessionStorage.getItem('broker');

export const validateComercialInfo = (values) => {
  let errors = {};
  const user = JSON.parse(sessionStorage.getItem("user"));
  const idClient = user.idClient;
  const type = idClient.type;

  if (process.env.REACT_APP_CONFIGURATION === 'production') {
    if (!values.zipCode) {
    errors.zipCode = "Ingresar código postal";
  } else {
    if (values.zipCode.length < 5) {
      errors.zipCode = "Código postal inválido";
    }
  }
  if (!values.town) {
    errors.town = "Seleccione una colonia";
  }
  }

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

  if(!values.employeesNumber){
    errors.employeesNumber = "Selecciona una opción";
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

  return errors;
};
